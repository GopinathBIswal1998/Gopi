import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { experience } from "../data.js";
import { MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-16 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Experience"
            title="Where I've shipped code"
            // subtitle="Two internships, two very different domains — sports and banking."
          />
        </Reveal>

        <div className="relative border-l border-ink-border pl-8 sm:pl-10 space-y-14">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 100} className="relative">
              <span className="absolute -left-[2.55rem] sm:-left-[2.75rem] top-1.5 w-3 h-3 rounded-full bg-amber shadow-[0_0_0_4px_rgba(242,169,59,0.15)]" />

              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="font-display font-semibold text-xl text-ink_text-primary">
                  {job.role}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink_text-secondary mb-4">
                <span className="text-amber font-medium">{job.company}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {job.location}
                </span>
                <span className="font-mono text-xs">{job.period}</span>
              </div>

              <ul className="space-y-2">
                {job.points.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-ink_text-secondary text-[15px] leading-relaxed">
                    <span className="font-mono text-amber/70 mt-0.5">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
