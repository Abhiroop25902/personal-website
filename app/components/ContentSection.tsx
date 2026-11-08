import type { ReactNode } from "react";

type ContentSectionProps = {
  title: string;
  headingId?: string;
  showHeading?: boolean;
  children: ReactNode;
};

export default function ContentSection({
  title,
  headingId,
  showHeading = true,
  children,
}: ContentSectionProps) {
  const labelledBy = showHeading ? headingId : undefined;

  return (
    <section
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : title}
      className="mt-10"
    >
      {showHeading && (
        <h2 id={headingId} className="mb-6 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
