import Matter from "matter-js";

export type Pose = {
  x: number;
  y: number;
  angle: number;
  vx: number;
  vy: number;
  angularVelocity: number;
};

export type PhysicsPiece = {
  element: HTMLElement;
  width: number;
  height: number;
  pose: Pose;
};

export function startPhysics(
  layer: HTMLElement,
  pieces: PhysicsPiece[],
  getBounds: () => { width: number; height: number },
): { snapshot: () => Pose[]; destroy: () => void } {
  const { Bodies, Body, Composite, Constraint, Engine, Sleeping } = Matter;
  for (const { width, height, pose } of pieces) {
    if (width <= 0 || height <= 0 || ![width, height, ...Object.values(pose)].every(Number.isFinite)) {
      throw new RangeError("Physics pieces require finite poses and positive dimensions.");
    }
  }
  const engine = Engine.create({ enableSleeping: true });
  const bodies = pieces.map(({ width, height, pose }) => {
    const body = Bodies.rectangle(pose.x, pose.y, width, height, {
      angle: pose.angle,
      restitution: 0.5,
      friction: 0.45,
      frictionAir: 0.025,
      sleepThreshold: 45,
    });
    Body.setVelocity(body, { x: pose.vx, y: pose.vy });
    Body.setAngularVelocity(body, pose.angularVelocity);
    return body;
  });
  Composite.add(engine.world, bodies);
  const scales = pieces.map(() => 1);
  const elements = new Map(pieces.map(({ element }, i) => [element, bodies[i]]));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const step = 1000 / 60;
  let bounds = { width: 0, height: 0 };
  let walls: Matter.Body[] = [];
  let destroyed = false;
  let frame: number | null = null;
  let lastTime: number | undefined;
  let accumulator = 0;
  let drag: {
    element: HTMLElement;
    pointerId: number;
    body: Matter.Body;
    constraint: Matter.Constraint;
    point: Matter.Vector;
    time: number;
    velocity: Matter.Vector;
  } | null = null;

  function canRun() {
    return !destroyed && !document.hidden && !reducedMotion.matches;
  }

  function render() {
    bodies.forEach((body, i) => {
      const { element, width, height } = pieces[i];
      element.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad) scale(${scales[i]})`;
    });
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = undefined;
    accumulator = 0;
  }

  function wake() {
    if (canRun() && frame === null && (drag || bodies.some((body) => !body.isSleeping))) {
      frame = requestAnimationFrame(tick);
    }
  }

  function tick(time: number) {
    frame = null;
    if (!canRun()) return;
    accumulator += lastTime === undefined ? step : Math.min(Math.max(time - lastTime, 0), step * 4);
    lastTime = time;
    while (accumulator >= step) {
      Engine.update(engine, step);
      accumulator -= step;
    }
    render();
    if (drag || bodies.some((body) => !body.isSleeping)) {
      frame = requestAnimationFrame(tick);
    } else {
      lastTime = undefined;
      accumulator = 0;
    }
  }

  function resize() {
    if (destroyed) return;
    const next = getBounds();
    if (!Number.isFinite(next.width) || !Number.isFinite(next.height)) return;
    const width = Math.max(1, next.width);
    const height = Math.max(1, next.height);
    if (width === bounds.width && height === bounds.height) return;
    bounds = { width, height };
    Composite.remove(engine.world, walls);
    const thickness = 100;
    walls = [
      Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, { isStatic: true }),
      Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { isStatic: true }),
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
    ];
    Composite.add(engine.world, walls);
    bodies.forEach((body, i) => {
      // Fit the diagonal so an oversized piece can rotate without crossing either wall.
      const scale = Math.min(1, width / Math.hypot(pieces[i].width, pieces[i].height), height / Math.hypot(pieces[i].width, pieces[i].height));
      Body.scale(body, scale / scales[i], scale / scales[i]);
      scales[i] = scale;
      const cosine = Math.abs(Math.cos(body.angle));
      const sine = Math.abs(Math.sin(body.angle));
      const halfWidth = (cosine * pieces[i].width + sine * pieces[i].height) * scale / 2;
      const halfHeight = (sine * pieces[i].width + cosine * pieces[i].height) * scale / 2;
      Body.setPosition(body, {
        x: Math.min(width - halfWidth, Math.max(halfWidth, body.position.x)),
        y: Math.min(height - halfHeight, Math.max(halfHeight, body.position.y)),
      });
      Sleeping.set(body, false);
    });
    render();
    wake();
  }

  function point(event: PointerEvent) {
    const rect = layer.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function release(throwPiece: boolean, time = 0) {
    if (!drag) return;
    const current = drag;
    drag = null;
    Composite.remove(engine.world, current.constraint);
    Body.setVelocity(current.body, throwPiece && time - current.time < 100 ? current.velocity : { x: 0, y: 0 });
    if (!throwPiece) Body.setAngularVelocity(current.body, 0);
    if (current.element.hasPointerCapture(current.pointerId)) {
      current.element.releasePointerCapture(current.pointerId);
    }
    wake();
  }

  function pointerDown(event: PointerEvent) {
    if (!canRun() || drag || event.button !== 0 || !event.isPrimary) return;
    const element = event.currentTarget as HTMLElement;
    const body = elements.get(element)!;
    const position = point(event);
    const constraint = Constraint.create({
      pointA: position,
      bodyB: body,
      pointB: { x: position.x - body.position.x, y: position.y - body.position.y },
      length: 0,
      stiffness: 0.2,
      damping: 0.15,
    });
    drag = { element, body, constraint, pointerId: event.pointerId, point: position, time: event.timeStamp, velocity: { x: 0, y: 0 } };
    Composite.add(engine.world, constraint);
    Sleeping.set(body, false);
    Body.setVelocity(body, { x: 0, y: 0 });
    Body.setAngularVelocity(body, 0);
    event.preventDefault();
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      release(false);
    }
    wake();
  }

  function pointerMove(event: PointerEvent) {
    if (destroyed || !drag || drag.pointerId !== event.pointerId) return;
    const position = point(event);
    const elapsed = Math.max(8, event.timeStamp - drag.time);
    const velocity = { x: (position.x - drag.point.x) * step / elapsed, y: (position.y - drag.point.y) * step / elapsed };
    const speed = Math.hypot(velocity.x, velocity.y);
    const limit = Math.min(1, 30 / (speed || 1));
    drag.velocity = { x: velocity.x * limit, y: velocity.y * limit };
    drag.constraint.pointA = position;
    drag.point = position;
    drag.time = event.timeStamp;
    Sleeping.set(drag.body, false);
    event.preventDefault();
    wake();
  }

  function pointerEnd(event: PointerEvent) {
    if (destroyed || !drag || drag.pointerId !== event.pointerId) return;
    release(event.type === "pointerup", event.timeStamp);
  }

  function changeActivity() {
    if (destroyed) return;
    if (!canRun()) {
      release(false);
      stop();
    } else {
      wake();
    }
  }

  const pointerListeners = {
    pointerdown: pointerDown,
    pointermove: pointerMove,
    pointerup: pointerEnd,
    pointercancel: pointerEnd,
    lostpointercapture: pointerEnd,
  };
  let observer: ResizeObserver | null = null;
  const lifecycle = {
    snapshot: () => bodies.map((body) => {
      const velocity = Body.getVelocity(body);
      return { x: body.position.x, y: body.position.y, angle: body.angle, vx: velocity.x, vy: velocity.y, angularVelocity: Body.getAngularVelocity(body) };
    }),
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      stop();
      release(false);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", changeActivity);
      reducedMotion.removeEventListener("change", changeActivity);
      pieces.forEach(({ element }) => {
        Object.entries(pointerListeners).forEach(([type, listener]) => {
          element.removeEventListener(type, listener as EventListener);
        });
      });
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    },
  };
  try {
    pieces.forEach(({ element }) => {
      Object.entries(pointerListeners).forEach(([type, listener]) => {
        element.addEventListener(type, listener as EventListener);
      });
    });
    observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(layer);
    if (layer.parentElement) observer?.observe(layer.parentElement);
    observer?.observe(document.documentElement);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", changeActivity);
    reducedMotion.addEventListener("change", changeActivity);
    resize();
    return lifecycle;
  } catch (error) {
    lifecycle.destroy();
    throw error;
  }
}
