import ProfileLink from "@/app/components/ProfileLink";
import {personalLinks} from "@/app/data/personal_links";

export default function ProfileHeader() {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="motion-enter text-3xl font-semibold tracking-tight sm:text-4xl">
          Abhiroop Mukherjee
        </h1>
        <p className="motion-enter motion-enter-headline mt-4 text-base leading-7 text-foreground/65">
          Application Software Engineer 2 @Oracle | CS @IIEST
        </p>
      </div>

      <nav aria-label="Personal links" className="shrink-0">
        <ul className="flex gap-2">
          {personalLinks.map((link) => (
            <ProfileLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
