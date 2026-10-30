import type { IconType } from "react-icons";

type ProfileLinkProps = {
  href: string;
  label: string;
  icon: IconType;
};

export default function ProfileLink({ href, label, icon: Icon }: ProfileLinkProps) {
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        title={label}
        className="profile-link inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <Icon size={20} aria-hidden="true" />
      </a>
    </li>
  );
}
