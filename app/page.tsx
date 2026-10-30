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
        className="mt-8 inline-flex min-h-11 items-center rounded-sm text-sm text-foreground/65 underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        View all projects →
      </Link>
    </main>
  );
}
