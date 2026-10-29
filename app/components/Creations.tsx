import { creations } from "@/app/data/creations";

export default function Creations() {
  return (
    <section aria-labelledby="timeline-heading" className="mt-16 sm:mt-24">
      <h2
        id="timeline-heading"
        className="text-sm font-medium uppercase tracking-widest text-foreground/60"
      >
        Creations
      </h2>
      <ol role="list" className="mt-8 space-y-10 border-l border-foreground/20">
        {creations.map((creation) => (
          <li key={creation.href} className="relative pb-2 pl-7">
            <span
              aria-hidden="true"
              className="absolute -left-1.25 top-1.5 size-2.5 rounded-full bg-foreground/60"
            />
            <time
              dateTime={creation.dateTime}
              className="font-mono text-sm text-foreground/60"
            >
              {creation.displayDate}
            </time>
            <h3 className="mt-3 text-xl font-medium tracking-tight">
              <a
                href={creation.href}
                className="rounded-sm underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {creation.title}
              </a>
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/65">
              {creation.description}
            </p>
            {creation.supportingLinks?.length ? (
              <ul
                role="list"
                aria-label={`${creation.title} supporting links`}
                className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm"
              >
                {creation.supportingLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-label={`${creation.title}: ${link.label}`}
                      className="inline-flex min-h-6 items-center rounded-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
