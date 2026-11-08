import ProfileLink from "@/app/components/ProfileLink";
import {personalLinks} from "@/app/data/personal_links";

export default function ProfileHeader() {
  return (
    <header className="grid gap-x-6 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <h1 className="motion-enter text-3xl font-semibold tracking-tight sm:text-4xl">
          Abhiroop Mukherjee
        </h1>
        <p className="motion-enter motion-enter-headline mt-4 text-base leading-7 text-foreground/65">
          Application Software Engineer 2 @Oracle | CS @IIEST
        </p>
      </div>

      <p className="motion-enter motion-enter-headline mt-3 text-base leading-7 text-foreground/80 sm:col-span-2">
        I turn curiosity into software, building tools and experiments across AI,
        systems, and the web.
      </p>

      <nav
        aria-label="Personal links"
        className="mt-6 sm:col-start-2 sm:row-start-1 sm:mt-0 sm:self-start"
      >
        <ul className="flex gap-2">
          {personalLinks.map((link) => (
            <ProfileLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
