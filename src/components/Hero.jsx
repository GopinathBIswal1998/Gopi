import { ArrowDownRight, Mail, MessageCircle } from "lucide-react";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import NetworkBackground from "./NetworkBackground.jsx";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
// import profileImg from "../assets/portfolio img.png";
import profileImg from "../assets/profile1.png";
import { profile } from "../data.js";

export default function Hero() {
  const profileVisualRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const flipControls = useAnimationControls();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: profileVisualRef,
    offset: ["start end", "end start"],
  });
  const profileY = useTransform(scrollYProgress, [0, 0.5, 1], [36, -12, -52]);
  const profileRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 4]);
  const profileScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    flipControls.start({
      rotateY: 0,
      opacity: 1,
      transition: { duration: 1.15, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
    });
  }, [flipControls, prefersReducedMotion]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (prefersReducedMotion || current > 80) return;
    const previous = scrollY.getPrevious();
    if (previous !== undefined && current < previous && previous > 80) {
      flipControls.start({
        rotateY: [0, 360, 360],
        transition: { duration: 1.15, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1] },
      });
    }
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-grid bg-grid"
    >
      <NetworkBackground className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/70 to-ink-900 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center w-full">
        <div className="animate-fadeUp">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-teal border border-teal/30 bg-teal/5 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulseNode" />
            status: open to opportunities
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-ink_text-primary text-glow">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-amber text-base sm:text-lg">
            <span className="text-ink_text-faint">☕ </span>
            {profile.role}
            <span className="animate-blink text-amber">_</span>
          </p>

          <p className="mt-6 max-w-xl text-ink_text-secondary text-base sm:text-lg leading-relaxed">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="hero-action hero-action-projects group inline-flex items-center gap-2 bg-amber text-ink-900 font-semibold px-6 py-3 rounded-md hover:bg-amber-soft transition-colors shadow-[0_0_30px_-8px_rgba(242,169,59,0.6)]"
            >
              <span className="hero-action-content">View Projects</span>
              <ArrowDownRight size={17} className="hero-action-icon" />
            </a>
            <a
              href="#contact"
              className="hero-action hero-action-talk group inline-flex items-center gap-2 border border-ink-border text-ink_text-primary font-semibold px-6 py-3 rounded-md hover:border-amber/50 hover:text-amber transition-colors"
            >
              <span className="hero-action-content">Let's Talk</span>
              <MessageCircle size={17} className="hero-action-icon" />
              <span className="talk-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-ink_text-secondary">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link social-github hover:text-amber transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link social-linkedin hover:text-amber transition-colors">
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="social-link social-email hover:text-amber transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <motion.div
          ref={profileVisualRef}
          className="profile-style-2 relative mx-auto md:mx-0 animate-fadeUp"
          style={prefersReducedMotion ? undefined : { y: profileY, rotate: profileRotate, scale: profileScale }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.92 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="profile-flip"
            animate={flipControls}
            initial={prefersReducedMotion ? false : { rotateY: 88, opacity: 0 }}
          >
            <div className="profile-orbit profile-orbit-one" aria-hidden="true" />
            <div className="profile-orbit profile-orbit-two" aria-hidden="true" />
            <div className="profile-grid" aria-hidden="true" />
            <div className="profile-frame w-72 sm:w-96 md:w-full max-w-md rounded-[1.75rem] overflow-hidden">
              <img
                src={profileImg}
                alt={`${profile.name} portrait`}
                className="profile-image w-full h-auto object-cover grayscale-[15%] contrast-105"
              />
            </div>
            <span className="profile-corner profile-corner-top" aria-hidden="true" />
            <span className="profile-corner profile-corner-bottom" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink_text-faint hover:text-amber transition-colors"
        aria-label="Scroll to about section"
      >
        {/* <ArrowDown size={22} className="animate-floatSlow" /> */}
      </a>
    </section>
  );
}