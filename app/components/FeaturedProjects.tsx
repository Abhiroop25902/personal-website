import Link from "next/link";
import ContentEntry from "@/app/components/ContentEntry";
import ContentSection from "@/app/components/ContentSection";
import { projects } from "@/app/data/projects";

export default function FeaturedProjects() {
  return (
    <ContentSection title="In Code" headingId="in-code-heading">
      <ul role="list" className="space-y-8">
        {projects
          .filter((project) => project.featured)
          .map((project, index) => (
            <li
              key={project.href ?? project.title}
              className="motion-enter mb-6"
              style={{ animationDelay: `${120 + index * 60}ms` }}
            >
              <ContentEntry
                title={project.title}
                href={project.href}
                description={project.description}
              />
            </li>
          ))}
      </ul>
      <Link
        href="/projects"
        className="projects-link mt-0 inline-flex min-h-11 items-center gap-1 rounded-sm text-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        View all projects
        <span aria-hidden="true" className="projects-link-arrow inline-block">
          →
        </span>
      </Link>
    </ContentSection>
  );
}
