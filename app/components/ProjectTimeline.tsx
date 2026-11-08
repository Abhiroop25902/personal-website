import { projects } from "@/app/data/projects";
import ContentEntry from "@/app/components/ContentEntry";
import ContentSection from "@/app/components/ContentSection";
import TimelineReveal from "@/app/components/TimelineReveal";

export default function ProjectTimeline() {
  return (
    <ContentSection title="Project timeline" showHeading={false}>
      <TimelineReveal>
        <ol role="list" className="space-y-10 border-l border-foreground/20">
          {projects.map((project) => (
            <li
              key={project.href ?? project.title}
              className="timeline-entry relative pl-7 mb-6"
            >
              <span
                aria-hidden="true"
                className="timeline-dot absolute -left-1.25 top-1.5 size-2.5 rounded-full bg-foreground/60"
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
              <ContentEntry
                as="h2"
                className="mt-2"
                title={project.title}
                href={project.href}
                description={project.description}
              />
              {project.supportingLinks?.length ? (
                <ul
                  role="list"
                  aria-label={`${project.title} supporting links`}
                  className={`mt-3 gap-y-2 text-sm ${
                    project.supportingLinksLayout === "columns"
                      ? "grid grid-cols-1 gap-x-6 sm:grid-cols-2"
                      : "flex flex-wrap gap-x-4"
                  }`}
                >
                  {project.supportingLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-label={`${project.title}: ${link.label}`}
                        className={`${
                          project.supportingLinksLayout === "columns"
                            ? "flex min-h-8"
                            : "inline-flex min-h-6"
                        } items-center rounded-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground`}
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
      </TimelineReveal>
    </ContentSection>
  );
}
