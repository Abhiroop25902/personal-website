import type { Metadata } from "next";
import ContentEntry from "@/app/components/ContentEntry";
import ContentSection from "@/app/components/ContentSection";
import FeaturedProjects from "@/app/components/FeaturedProjects";
import ProfileHeader from "@/app/components/ProfileHeader";
import HomepageSurprise from "@/app/components/HomepageSurprise";
import { personalLinks } from "@/app/data/personal_links";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://abhiroop.dev/",
  },
};

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://abhiroop.dev/",
  mainEntity: {
    "@type": "Person",
    name: "Abhiroop Mukherjee",
    url: "https://abhiroop.dev/",
    description: "Application Software Engineer 2 @Oracle | CS @IIEST",
    sameAs: personalLinks
      .filter(({ label }) => ["GitHub", "LinkedIn", "Google Scholar"].includes(label))
      .map(({ href }) => href),
  },
};

export default function Home() {
  return (
    <HomepageSurprise>
      <main className="mx-auto min-h-svh w-full max-w-5xl flex-1 px-6 py-12 font-sans sm:px-8 sm:py-16">
        <ProfileHeader />
        <ContentSection title="In Print" headingId="in-print-heading">
          <ul role="list">
            <li className="motion-enter" style={{ animationDelay: "120ms" }}>
              <ContentEntry
                title="Detection of Cipher Types Using Machine Learning Techniques"
                href="https://link.springer.com/chapter/10.1007/978-981-99-3734-9_25"
                description={
                  <>
                    Computational Intelligence in Pattern Recognition · Springer ·{" "}
                    <time dateTime="2023">2023</time>
                  </>
                }
              />
            </li>
          </ul>
        </ContentSection>
        <FeaturedProjects />
        <p className="mt-2 text-sm leading-6 text-foreground/65">
          Outside of code, I stream games as{" "}
          <a
            href="https://www.youtube.com/@devastrator25902"
            className="rounded-sm underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Devastrator
          </a>
          .
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profile).replace(/</g, "\\u003c"),
          }}
        />
      </main>
    </HomepageSurprise>
  );
}
