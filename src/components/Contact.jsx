import { Mail, Phone, MapPin, Download } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import ContactForm from "./ContactForm.jsx";
import { GithubIcon, LinkedinIcon, WhatsappIcon, InstagramIcon } from "./BrandIcons.jsx";
import { profile } from "../data.js";

const socialLinks = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: profile.github,
    text: "text-ink_text-primary",
    border: "border-ink-border",
    bg: "bg-ink-800/50",
    hoverBg: "hover:bg-white",
    hoverText: "hover:text-black",
    hoverBorder: "hover:border-white",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: profile.linkedin,
    text: "text-[#0A66C2]",
    border: "border-[#0A66C2]/35",
    bg: "bg-[#0A66C2]/10",
    hoverBg: "hover:bg-[#0A66C2]",
    hoverText: "hover:text-white",
    hoverBorder: "hover:border-[#0A66C2]",
  },
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    href: profile.whatsapp,
    text: "text-[#25D366]",
    border: "border-[#25D366]/35",
    bg: "bg-[#25D366]/10",
    hoverBg: "hover:bg-[#25D366]",
    hoverText: "hover:text-ink-900",
    hoverBorder: "hover:border-[#25D366]",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: profile.instagram,
    text: "text-[#E1306C]",
    border: "border-[#E1306C]/35",
    bg: "bg-[#E1306C]/10",
    hoverBg: "hover:bg-[#E1306C]",
    hoverText: "hover:text-white",
    hoverBorder: "hover:border-[#E1306C]",
  },
];

export default function Contact() {
  const telHref = `tel:${profile.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="contact" className="py-10 sm:py-16 border-t border-ink-border bg-ink-950/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Contact"
            title="Let's build something reliable."
            />
        </Reveal>

        <div className="contact-layout grid lg:grid-cols-[minmax(0,26rem)_auto_minmax(0,1fr)] gap-6 lg:gap-10 items-stretch text-left">
          {/* Left: Get in touch card — sizes to its own content */}
          <Reveal delay={80} className="contact-column">
            <div className="contact-card contact-details-card h-full w-full rounded-2xl border border-ink-border bg-ink-800/40 p-6 sm:p-8">
              <div className="contact-details-heading">
                <h3 className="font-display font-semibold text-xl text-ink_text-primary mb-1">
                  Get in Touch
                </h3>
                <p className="font-display font-bold text-lg text-amber">{profile.name}</p>
              </div>

              <div className="space-y-4">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-detail-row flex items-center gap-3 text-sm text-ink_text-secondary hover:text-amber transition-colors"
                >
                  <Mail size={17} className="text-amber shrink-0" />
                  <span>{profile.email}</span>
                </a>
                <a
                  href={telHref}
                  className="contact-detail-row flex items-center gap-3 text-sm text-ink_text-secondary hover:text-amber transition-colors"
                >
                  <Phone size={17} className="text-amber shrink-0" />
                  <span>{profile.phone}</span>
                </a>
                <div className="contact-detail-row flex items-center gap-3 text-sm text-ink_text-secondary">
                  <MapPin size={17} className="text-amber shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>

              <div className="contact-focus-block">
                <div className="contact-console-heading">
                  <span className="contact-focus-label">Contact protocol</span>
                  <span className="contact-console-status"><i /> ready</span>
                </div>
                <div className="contact-console">
                  <span><b>$</b> initiate_connection</span>
                  <span><b>&gt;</b> bring your idea or challenge</span>
                  <span><b>&gt;</b> find a practical next step</span>
                  <span className="contact-console-cursor"><b>&gt;</b> awaiting your message<span>_</span></span>
                </div>
              </div>

              <a
                href={profile.resumeUrl}
                download
                className="resume-action mt-8 inline-flex items-center justify-center gap-2 border border-amber/40 text-amber font-semibold px-5 py-3 rounded-md hover:bg-amber hover:text-ink-900 transition-colors"
              >
                <Download size={17} /> Download Resume
              </a>
            </div>
          </Reveal>

          {/* Middle: vertical column of social icons, each in its own brand color */}
          <Reveal delay={140} className="contact-column contact-social-column">
            <div className="contact-social-list flex lg:flex-col flex-row flex-wrap items-center justify-center gap-4 lg:gap-5 py-2 lg:py-4 lg:px-6">
              {socialLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  title={l.label}
                  aria-label={l.label}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 ${l.text} ${l.border} ${l.bg} ${l.hoverBg} ${l.hoverText} ${l.hoverBorder}`}
                >
                  <l.icon size={20} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Right: message form */}
          <Reveal delay={200} className="contact-column">
            <div className="contact-card message-card h-full rounded-2xl border border-ink-border bg-ink-800/40 p-6 sm:p-8">
              <h3 className="font-display font-semibold text-xl text-ink_text-primary mb-1">
                Send a Message
              </h3>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}