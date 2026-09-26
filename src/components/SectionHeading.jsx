export default function SectionHeading({ kicker, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {kicker && (
        <div
          className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber mb-4 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          {kicker}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink_text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-ink_text-secondary text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
