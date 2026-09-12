type SectionHeadingProps = {
  subtitle: string;
  title: string;
  dark?: boolean;
};

export default function SectionHeading({ subtitle, title, dark = false }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <span className={`block text-xs font-bold tracking-[0.2em] uppercase mb-4 ${dark ? "text-mint" : "text-ink-mid"}`}>
        {subtitle}
      </span>
      <h2 className={`text-4xl md:text-5xl font-serif leading-tight ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
    </div>
  );
}
