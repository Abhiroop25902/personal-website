import { projects } from "@/app/data/projects";

export default function FeaturedProjects() {
  return (
    <section aria-label="Selected projects" className="mt-10 sm:mt-12">
      <ul role="list" className="space-y-8">
        {projects
          .filter((project) => project.featured)
          .map((project) => (
            <li key={project.href ?? project.title}>
              <h2 className="text-xl font-medium tracking-tight">
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
            </li>
          ))}
      </ul>
    </section>
  );
}
