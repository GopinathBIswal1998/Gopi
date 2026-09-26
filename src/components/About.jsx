import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import AnimatedStat from "./AnimatedStat.jsx";
import { WhatsappIcon, InstagramIcon } from "./BrandIcons.jsx";
import { profile, stats } from "../data.js";

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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal className="space-y-5 text-ink_text-secondary leading-relaxed text-base sm:text-[17px]">
            <p>
              I'm a responsible and creative Java Web Developer based in {profile.location},
              specializing in Spring Boot, REST APIs and microservices. I enjoy turning complex
              requirements into secure, scalable and maintainable solutions that create real
              value for users and businesses.
            </p>
            <p>
              My experience spans the full web-development lifecycle, from designing backend
              services with Java, Spring Boot, Spring Data JPA and Spring Security to building
              responsive interfaces with ReactJS and Angular. I focus on delivering secure,
              reliable features, clean API integrations and scalable applications that are ready
              for production.
            </p>
            <p>
              I approach every challenge with initiative, punctuality and a collaborative mindset.
              I work comfortably in teams and under pressure, communicate clearly with colleagues,
              and solve problems efficiently while staying focused on the goals of the organization
              and the team.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
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

          <Reveal delay={100} className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-ink-border bg-ink-800/50 p-5 hover:border-amber/40 transition-colors"
              >
                <AnimatedStat
                  value={s.value}
                  className="font-display font-bold text-2xl sm:text-3xl text-amber"
                />
                <div className="mt-1 text-xs sm:text-sm text-ink_text-secondary">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
