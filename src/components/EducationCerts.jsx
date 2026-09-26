import { GraduationCap, Award } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { education, certifications } from "../data.js";

export default function EducationCerts() {
  return (
    <section id="education" className="py-10 sm:py-16 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-14">
        <div>
          <Reveal>
            <SectionHeading kicker="Education" title="Education" />
          </Reveal>
          <div className="space-y-6">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 80}>
                {/* <div className="flex gap-4 rounded-xl border border-ink-border bg-ink-800/40 p-5"> */}
                <div className="flex gap-4 rounded-xl border border-ink-border bg-ink-800/40 p-5 hover:border-amber/40 hover:-translate-y-1 transition-all duration-300">
                  <GraduationCap className="text-amber shrink-0 mt-1" size={22} />
                  <div>
                    <h3 className="font-display font-semibold text-ink_text-primary">
                      {e.degree}
                    </h3>
                    <p className="text-sm text-ink_text-secondary mt-1">{e.school}</p>
                    <div className="flex gap-3 mt-2 font-mono text-xs text-ink_text-faint">
                      <span>{e.detail}</span>
                      <span>{e.period}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionHeading kicker="Certifications" title="Certifications & Achievements" />
          </Reveal>
          <div className="space-y-6">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                {/* <div className="flex gap-4 rounded-xl border border-ink-border bg-ink-800/40 p-5"> */}
                <div className="flex gap-4 rounded-xl border border-ink-border bg-ink-800/40 p-5 hover:border-amber/40 hover:-translate-y-1 transition-all duration-300">
                  <Award className="text-teal shrink-0 mt-1" size={22} />
                  <div>
                    <h3 className="font-display font-semibold text-ink_text-primary">
                      {c.title}
                    </h3>
                    <p className="text-sm text-ink_text-secondary mt-1">{c.issuer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
