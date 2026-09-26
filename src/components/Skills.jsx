import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { skillGroups } from "../data.js";

export default function Skills() {
  return (
    <section id="skills" className="py-10 sm:py-16 border-t border-ink-border bg-ink-950/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Skills"
            title="Expertises & Technologies"
            // subtitle="Grouped the way I actually use them — backend first, everything else in support."
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="skill-card h-full rounded-xl border border-ink-border bg-ink-800/40 p-6">
                <h3 className="skill-card-title font-display font-semibold text-lg text-ink_text-primary mb-4">
                  <span className="skill-status" aria-hidden="true" />
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIndex) => (
                    <span
                      key={item}
                      style={{ "--skill-delay": `${itemIndex * 35}ms` }}
                      className="skill-chip font-mono text-[12px] px-2.5 py-1 rounded-md bg-ink-700/60 border border-ink-border text-ink_text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
