type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-4xl text-[#5C3A57]">
        {title}
      </h2>

      {(subtitle || description) && (
        <p
          className={`mt-4 text-[#7A6574] ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle || description}
        </p>
      )}
    </div>
  );
}