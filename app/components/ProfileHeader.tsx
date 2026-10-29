import { FiFileText, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";

export default function ProfileHeader() {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Abhiroop Mukherjee
        </h1>
        <p className="mt-4 text-base leading-7 text-foreground/65">
          Application Software Engineer 2 @Oracle | CS @IIEST
        </p>
      </div>

      <nav aria-label="Personal links" className="shrink-0">
        <ul className="flex gap-2">
          <li>
            <a
              href="https://github.com/Abhiroop25902/cv/blob/main/abhiroopCV.pdf"
              aria-label="View CV"
              title="View CV"
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <FiFileText size={20} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Abhiroop25902"
              aria-label="GitHub"
              title="GitHub"
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <FiGithub size={20} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abhiroop25902/"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <FiLinkedin size={20} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://scholar.google.com/citations?user=nMuXGfwAAAAJ&hl=en"
              aria-label="Google Scholar"
              title="Google Scholar"
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <SiGooglescholar size={20} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
