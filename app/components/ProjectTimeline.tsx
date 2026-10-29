import { projects } from "@/app/data/projects";

export default function ProjectTimeline() {
  return (
    <section aria-label="Project timeline" className="mt-10 sm:mt-12">
      <ol role="list" className="space-y-10 border-l border-foreground/20">
        {projects.map((project) => (
          <li
            key={project.href ?? project.title}
            className="relative pb-2 pl-7"
          >
            <span
              aria-hidden="true"
              className="absolute -left-1.25 top-1.5 size-2.5 rounded-full bg-foreground/60"
            />
            {project.dateTime ? (
              <time
                dateTime={project.dateTime}
                className="font-mono text-sm text-foreground/60"
              >
                {project.displayDate}
              </time>
            ) : (
              <span className="font-mono text-sm text-foreground/60">
                {project.displayDate}
              </span>
            )}
            <h2 className="mt-3 text-xl font-medium tracking-tight">
              {project.href ? (
                <a
                  href={project.href}
                  className="rounded-sm underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/65">
              {project.description}
            </p>
            {project.supportingLinks?.length ? (
              <ul
                role="list"
                aria-label={`${project.title} supporting links`}
                className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm"
              >
                {project.supportingLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-label={`${project.title}: ${link.label}`}
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
