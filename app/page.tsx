import Link from "next/link";
import FeaturedProjects from "@/app/components/FeaturedProjects";
import ProfileHeader from "@/app/components/ProfileHeader";

export default function Home() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-5xl flex-1 px-6 py-12 font-sans sm:px-8 sm:py-16">
      <ProfileHeader />
      <FeaturedProjects />
      <Link
        href="/projects"
        className="projects-link mt-8 inline-flex min-h-11 items-center gap-1 rounded-sm text-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        View all projects
        <span aria-hidden="true" className="projects-link-arrow inline-block">
          →
        </span>
      </Link>
      <p className="mt-6 text-sm leading-6 text-foreground/65">
        Outside of code, I stream games as{" "}
        <a
          href="https://www.youtube.com/@devastrator25902"
          className="rounded-sm underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Devastrator
        </a>
        .
      </p>
    </main>
  );
}
