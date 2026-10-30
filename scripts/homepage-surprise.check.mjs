import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

// Browser scheduling is stubbed; bodies, collisions and constraints use real Matter.js.
class Surface extends EventTarget {
  listeners = new Map();
  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options);
    this.listeners.set(callback, type);
  }
  removeEventListener(type, callback, options) {
    super.removeEventListener(type, callback, options);
    this.listeners.delete(callback);
  }
}

class Element extends Surface {
  style = {};
  parentElement = null;
  captured = new Set();
  getBoundingClientRect() { return { left: 12, top: -180 }; }
  setPointerCapture(id) { this.captured.add(id); }
  hasPointerCapture(id) { return this.captured.has(id); }
  releasePointerCapture(id) {
    this.captured.delete(id);
    pointer(this, "lostpointercapture", { pointerId: id });
  }
}

let now = 0;
let nextFrame = 0;
const queued = new Map();
const observers = new Set();
const windowSurface = new Surface();
const documentSurface = new Surface();
const media = new Surface();
media.matches = false;
windowSurface.matchMedia = () => media;
documentSurface.hidden = false;
documentSurface.documentElement = new Element();
Object.assign(globalThis, {
  window: windowSurface,
  document: documentSurface,
  requestAnimationFrame: (callback) => {
    queued.set(++nextFrame, callback);
    return nextFrame;
  },
  cancelAnimationFrame: (id) => queued.delete(id),
  ResizeObserver: class {
    constructor(callback) { this.callback = callback; observers.add(this); }
    observe() {}
    disconnect() { observers.delete(this); }
  },
});

function frames(count, delta = 1000 / 60) {
  for (let i = 0; i < count; i++) {
    now += delta;
    const callbacks = [...queued.values()];
    queued.clear();
    callbacks.forEach((callback) => callback(now));
  }
}

function pointer(element, type, values = {}) {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, Object.fromEntries(Object.entries({
    pointerId: 1, button: 0, isPrimary: true, clientX: 92, clientY: -140,
    timeStamp: now, ...values,
  }).map(([key, value]) => [key, { value }])));
  element.dispatchEvent(event);
}

function fixture(width = 320, height = 400) {
  const layer = new Element();
  layer.parentElement = new Element();
  const bounds = { width, height };
  return { layer, bounds, getBounds: () => ({ ...bounds }) };
}

function piece(values = {}) {
  return {
    element: new Element(), width: 30, height: 20,
    pose: { x: 80, y: 40, angle: 0.2, vx: 2, vy: -1, angularVelocity: 0.03 },
    ...values,
  };
}

function finite(poses) {
  for (const pose of poses) assert.ok(Object.values(pose).every(Number.isFinite));
}

function inside(pose, width, height, bounds, scale = 1, tolerance = 1) {
  const halfWidth = (Math.abs(Math.cos(pose.angle)) * width + Math.abs(Math.sin(pose.angle)) * height) * scale / 2;
  const halfHeight = (Math.abs(Math.sin(pose.angle)) * width + Math.abs(Math.cos(pose.angle)) * height) * scale / 2;
  assert.ok(pose.x >= halfWidth - tolerance && pose.x <= bounds.width - halfWidth + tolerance, `x out of bounds: ${JSON.stringify(pose)}`);
  assert.ok(pose.y >= halfHeight - tolerance && pose.y <= bounds.height - halfHeight + tolerance, `y out of bounds: ${JSON.stringify(pose)}`);
}

const { startPhysics } = await import("../app/components/homepageSurprisePhysics.ts");
assert.equal(typeof startPhysics, "function", "physics module must export its lifecycle API");

// A failing bounds measurement must not strand listeners or an animation loop.
{
  const f = fixture();
  const p = piece();
  assert.throws(() => startPhysics(f.layer, [p], () => { throw new Error("measurement failed"); }), /measurement failed/);
  assert.equal(p.element.listeners.size, 0);
  assert.equal(observers.size, 0);
  assert.equal(queued.size, 0);
}

// Missing integration, unsafe dimensions and snapshots derived from stale DOM fail here.
{
  const f = fixture();
  assert.throws(() => startPhysics(f.layer, [piece({ width: 0 })], f.getBounds), RangeError);
  assert.throws(() => startPhysics(f.layer, [piece({ pose: { ...piece().pose, x: NaN } })], f.getBounds), RangeError);
  const pieces = [piece(), piece({ pose: { x: 180, y: 120, angle: 0, vx: -1, vy: 0, angularVelocity: 0 } })];
  const physics = startPhysics(f.layer, pieces, f.getBounds);
  assert.equal(physics.snapshot().length, 2);
  assert.equal(physics.snapshot()[0].x, 80);
  frames(60);
  finite(physics.snapshot());
  assert.ok(physics.snapshot()[0].y > 40, "gravity must move real bodies");
  frames(900);
  physics.snapshot().forEach((pose, i) => inside(pose, pieces[i].width, pieces[i].height, f.bounds));
  assert.equal(queued.size, 0, "settled bodies must stop scheduling frames");
  Object.assign(f.bounds, { width: 160, height: 200 });
  observers.forEach((observer) => observer.callback([]));
  physics.snapshot().forEach((pose, i) => inside(pose, pieces[i].width, pieces[i].height, f.bounds));
  assert.ok(queued.size > 0, "resize must wake sleeping bodies");
  frames(120);
  finite(physics.snapshot());
  physics.destroy();
  physics.destroy();
  assert.equal(queued.size, 0);
  assert.equal(observers.size, 0);
  pieces.forEach(({ element }) => assert.equal(element.listeners.size, 0));
}

// Rotated, oversized pieces must fit after shrinking the containing page.
{
  const f = fixture(120, 160);
  const p = piece({ width: 900, height: 40, pose: { ...piece().pose, x: 800, y: -20, vx: 30 } });
  const physics = startPhysics(f.layer, [p], f.getBounds);
  const scale = Number(p.element.style.transform.match(/scale\(([^)]+)\)/)?.[1] ?? 1);
  assert.ok(scale < 1);
  inside(physics.snapshot()[0], p.width, p.height, f.bounds, scale, 0.01);
  frames(100);
  finite(physics.snapshot());
  physics.destroy();
}

// Pointer coordinates account for scrolling; release throws, cancellation does not.
{
  const f = fixture();
  const p = piece();
  const physics = startPhysics(f.layer, [p], f.getBounds);
  pointer(p.element, "pointerdown");
  assert.ok(p.element.hasPointerCapture(1));
  now += 17;
  pointer(p.element, "pointermove", { clientX: 162 });
  frames(2);
  assert.ok(physics.snapshot()[0].x > 90, "constraint must pull toward the pointer in layer coordinates");
  pointer(p.element, "pointerup", { clientX: 162 });
  assert.ok(physics.snapshot()[0].vx > 0.1, "release must retain a throw velocity");
  pointer(p.element, "pointerdown");
  pointer(p.element, "pointercancel");
  assert.equal(physics.snapshot()[0].vx, 0);
  assert.equal(p.element.captured.size, 0);

  pointer(p.element, "pointerdown");
  documentSurface.hidden = true;
  documentSurface.dispatchEvent(new Event("visibilitychange"));
  assert.equal(p.element.captured.size, 0);
  const hiddenPose = physics.snapshot();
  frames(10, 60_000);
  assert.deepEqual(physics.snapshot(), hiddenPose);
  assert.equal(queued.size, 0);
  documentSurface.hidden = false;
  documentSurface.dispatchEvent(new Event("visibilitychange"));
  frames(1, 60_000);
  assert.ok(Math.abs(physics.snapshot()[0].y - hiddenPose[0].y) < 30, "visibility resume must not catch up hidden time");

  pointer(p.element, "pointerdown");
  media.matches = true;
  media.dispatchEvent(new Event("change"));
  assert.equal(p.element.captured.size, 0);
  const reducedPose = physics.snapshot();
  frames(10);
  assert.deepEqual(physics.snapshot(), reducedPose);
  media.matches = false;
  media.dispatchEvent(new Event("change"));
  assert.ok(queued.size > 0);
  const lateFrame = [...queued.values()][0];
  const lateResize = [...observers][0].callback;
  physics.destroy();
  const destroyedPose = physics.snapshot();
  lateFrame(now + 100);
  lateResize([]);
  windowSurface.dispatchEvent(new Event("resize"));
  assert.deepEqual(physics.snapshot(), destroyedPose);
  assert.equal(queued.size, 0);
}

assert.equal(windowSurface.listeners.size, 0);
assert.equal(documentSurface.listeners.size, 0);
assert.equal(media.listeners.size, 0);
assert.equal(observers.size, 0);
console.log("Homepage surprise physics: geometry, collisions, sleep, resizing, dragging, pause and cleanup passed.");

// Use real server rendering; the browser-only import must never run during SSR.
const require = createRequire(import.meta.url);
const source = readFileSync(new URL("../app/components/HomepageSurprise.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
}).outputText;
function component(react = require("react")) {
  const loaded = [];
  const compiledModule = { exports: {} };
  new Function("require", "module", "exports", compiled)((name) => {
    loaded.push(name);
    if (name === "react") return react;
    if (name === "./homepageSurprisePhysics") throw new Error("simulated chunk loading failure");
    return require(name);
  }, compiledModule, compiledModule.exports);
  return { Component: compiledModule.exports.default, loaded };
}
{
  const { createElement } = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { Component, loaded } = component();
  const html = renderToStaticMarkup(createElement(Component, null, createElement("main", null, "Homepage content")));
  assert.ok(html.includes("<main>Homepage content</main>"));
  assert.match(html, /<button[^>]*hidden=""[^>]*disabled=""/);
  assert.ok(!html.includes("inert="));
  assert.ok(!loaded.includes("./homepageSurprisePhysics"));
}

// Exercise the native event handlers with a failed import, without a browser/framework.
{
  const refs = Array.from({ length: 5 }, () => Object.assign(new Element(), {
    dataset: {}, hidden: true, disabled: true, textContent: "",
    getAnimations: () => [], contains(target) { return target === this; },
    setAttribute() {}, removeAttribute() {}, replaceChildren() {},
    style: { removeProperty(name) { delete this[name]; } },
  }));
  const button = refs[3];
  const status = refs[4];
  let setup;
  let refIndex = 0;
  documentSurface.fonts = { ready: Promise.resolve() };
  const { Component, loaded } = component({
    ...require("react"),
    useRef: () => ({ current: refs[refIndex++] }),
    useLayoutEffect: (effect) => { setup = effect; },
  });
  Component({ children: null });
  const cleanup = setup();
  pointer(button, "pointerdown", { pointerType: "touch" });
  pointer(button, "click", { detail: 1 });
  await new Promise(setImmediate);
  assert.equal(button.dataset.revealed, "true");
  assert.equal(loaded.filter((name) => name === "./homepageSurprisePhysics").length, 0, "first touch only reveals the label");
  pointer(button, "pointerdown", { pointerType: "touch" });
  pointer(button, "click", { detail: 1 });
  await new Promise(setImmediate);
  assert.equal(loaded.filter((name) => name === "./homepageSurprisePhysics").length, 1, "second touch loads physics");
  assert.equal(button.hidden, false, "failed loading must leave a retry control");
  assert.equal(button.disabled, false);
  assert.match(status.textContent, /couldn't load/);
  pointer(button, "click", { detail: 0 });
  await new Promise(setImmediate);
  assert.equal(loaded.filter((name) => name === "./homepageSurprisePhysics").length, 2, "keyboard activation retries immediately");
  cleanup();
  assert.equal(button.listeners.size, 0);
  assert.equal(documentSurface.listeners.size, 0);
}
console.log("Homepage surprise UI: server fallback, two-tap discovery, keyboard activation and failed loading passed.");
