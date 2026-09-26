import { ArrowUpRight, Globe2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import HorizontalScroller from "./HorizontalScroller.jsx";
import NetworkBackground from "./NetworkBackground.jsx";
import { projects } from "../data.js";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogCloseRef = useRef(null);
  const dialogTriggerRef = useRef(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    dialogCloseRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      dialogTriggerRef.current?.focus();
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative py-10 sm:py-16 border-t border-ink-border overflow-hidden"
    >
      <NetworkBackground className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Projects"
            title="Projects I've worked with"
          />
        </Reveal>

        <Reveal delay={100}>
          <HorizontalScroller>
            {projects.map((p) => (
              <div
                key={p.name}
                data-card
                className="project-card group shrink-0 snap-start flex flex-col w-[260px] sm:w-[290px] rounded-xl border border-ink-border bg-ink-800/50 p-5"
              >
                <div className="project-card-glow" aria-hidden="true" />
                <div className="project-card-header flex items-center gap-2 mb-2">
                  <img
                    src={p.icon}
                    alt=""
                    width={p.iconSize ?? 24}
                    height={p.iconSize ?? 24}
                    loading="lazy"
                    className={`rounded object-contain ${p.iconClassName ?? ""}`}
                    style={{
                      width: `${p.iconSize ?? 24}px`,
                      height: `${p.iconSize ?? 24}px`,
                    }}
                  />
                  <h3 className="font-display font-semibold text-base text-ink_text-primary">
                    {p.name}
                  </h3>
                </div>

                <p className="project-card-description text-ink_text-secondary text-[13px] leading-relaxed mb-3 line-clamp-3">
                  {p.description}
                </p>

                <ul className="project-card-highlights space-y-1 mb-3">
                  {p.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex gap-2 text-[12px] text-ink_text-secondary">
                      <span className="text-amber/70 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-card-tech mt-auto flex flex-wrap gap-1.5 mb-4">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-ink-700/60 border border-ink-border text-ink_text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visit ${p.name} website`}
                  className="project-site-link inline-flex items-center gap-2 text-sm font-medium text-amber"
                >
                  <Globe2 size={16} /> Visit site
                  <ArrowUpRight size={14} className="ml-auto" />
                </a>
                <button
                  type="button"
                  onClick={(event) => {
                    dialogTriggerRef.current = event.currentTarget;
                    setSelectedProject(p);
                  }}
                  className="project-details-trigger mt-3 inline-flex items-center gap-2 text-xs font-mono text-ink_text-secondary"
                >
                  <span className="project-details-dot" aria-hidden="true" />
                  Explore project
                </button>
              </div>
            ))}
          </HorizontalScroller>
        </Reveal>
      </div>

      {selectedProject && (
        <div
          className="project-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <article className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              ref={dialogCloseRef}
              className="project-dialog-close"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>
            <div className="project-dialog-kicker">
              <img src={selectedProject.icon} alt="" width="28" height="28" className={selectedProject.iconClassName ?? ""} />
              <span>{selectedProject.category}</span>
            </div>
            <h3 id="project-dialog-title">{selectedProject.name}</h3>
            <p className="project-dialog-description">{selectedProject.description}</p>
            <div className="project-dialog-grid">
              <div>
                <span className="project-dialog-label">Project focus</span>
                <ul>
                  {selectedProject.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
              <div>
                <span className="project-dialog-label">Technology stack</span>
                <div className="project-dialog-tech">
                  {selectedProject.tech.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </div>
            </div>
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="project-dialog-link"
            >
              <Globe2 size={17} /> Visit live project <ArrowUpRight size={15} />
            </a>
          </article>
        </div>
      )}
    </section>
  );
}