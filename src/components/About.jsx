import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import AnimatedStat from "./AnimatedStat.jsx";
import { WhatsappIcon, InstagramIcon } from "./BrandIcons.jsx";
import { profile, stats } from "../data.js";

const focusAreas = [
  {
    number: "01",
    title: "Backend systems",
    detail: "Java, Spring Boot, secure REST APIs, and microservices.",
  },
  {
    number: "02",
    title: "Full-stack delivery",
    detail: "Responsive interfaces with React or Angular, connected to dependable services.",
  },
  {
    number: "03",
    title: "Reliable teamwork",
    detail: "Testing, clear API documentation, and iterative delivery with QA and product teams.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-10 sm:py-16 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="About me"
            title="A backend-minded engineer who ships full stack."
            subtitle={profile.tagline}
          />
        </Reveal>

        <div className="about-layout grid md:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-16 items-start">
          <Reveal className="about-copy text-ink_text-secondary leading-relaxed text-base sm:text-[17px]">
            <p>
              I'm a responsible and creative Java Web Developer based in {profile.location},
              specializing in Spring Boot, REST APIs and microservices. I enjoy turning complex
              requirements into secure, scalable and maintainable solutions that create real
              value for users and businesses.
            </p>
            <p>
              My experience spans the full web-development lifecycle, from designing backend
              services with Java, Spring Boot, Spring Data JPA and Spring Security to building
              responsive interfaces with ReactJS and Angular. I value clear communication,
              practical problem-solving, and reliable delivery with the wider team.
            </p>

            <div className="about-actions flex flex-wrap gap-3">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="about-social about-whatsapp inline-flex items-center gap-2 rounded-md border border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366] px-4 py-2 text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
              >
                <WhatsappIcon size={17} /> Chat on WhatsApp
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="about-social about-instagram inline-flex items-center gap-2 rounded-md border border-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <InstagramIcon size={17} /> {profile.instagramHandle}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="about-aside">
            <div className="about-stats grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="about-stat rounded-xl border border-ink-border bg-ink-800/50 p-4 sm:p-5">
                  <AnimatedStat
                    value={s.value}
                    className="font-display font-bold text-2xl sm:text-3xl text-amber"
                  />
                  <div className="mt-1 text-xs sm:text-sm text-ink_text-secondary">{s.label.trim()}</div>
                </div>
              ))}
            </div>

            <div className="about-focus">
              <div className="about-focus-heading">
                <span className="about-focus-marker" aria-hidden="true" />
                <h3>How I contribute</h3>
              </div>
              <div className="about-focus-list">
                {focusAreas.map((area) => (
                  <article className="about-focus-item" key={area.number}>
                    <span className="about-focus-number">{area.number}</span>
                    <div>
                      <h4>{area.title}</h4>
                      <p>{area.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
