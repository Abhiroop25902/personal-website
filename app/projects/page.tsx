import type { Metadata } from "next";
import Link from "next/link";
import ProjectTimeline from "@/app/components/ProjectTimeline";

export const metadata: Metadata = {
  title: "All projects | Abhiroop Mukherjee",
};

export default function Projects() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-5xl flex-1 px-6 py-12 font-sans sm:px-8 sm:py-16">
      <Link
        href="/"
        className="back-link inline-flex min-h-11 items-center gap-1 rounded-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <span aria-hidden="true" className="back-link-arrow inline-block">
          ←
        </span>
        Back to home
      </Link>
      <h1 className="motion-enter mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        All projects
      </h1>
      <ProjectTimeline />
    </main>
  );
}
