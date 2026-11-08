import type { ReactNode } from "react";

type ContentEntryProps = {
  title: string;
  href?: string;
  description: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export default function ContentEntry({
  title,
  href,
  description,
  as: Heading = "h3",
  className,
}: ContentEntryProps) {
  return (
    <div className={className}>
      <Heading className="text-xl font-medium tracking-tight">
        {href ? (
          <a
            href={href}
            className="rounded-sm underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </Heading>
      <p className="mt-2 text-sm leading-6 text-foreground/65">{description}</p>
    </div>
  );
}
