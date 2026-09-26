import { useEffect, useState } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { navLinks, profile } from "../data.js";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink-900/85 backdrop-blur-md border-b border-ink-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#home" onClick={() => setOpen(false)} className="nav-brand font-mono text-sm text-ink_text-primary flex items-center gap-2">
          <span className="nav-brand-prompt text-amber">$</span>
          <span className="nav-brand-name hidden sm:inline" aria-label="Gopi">
            {["G", "o", "p", "i"].map((letter, index) => (
              <span key={letter} style={{ "--letter-delay": `${index * 90}ms` }}>
                {letter}
              </span>
            ))}
          </span>
          {/* <span className="nav-brand-name sm:hidden" aria-label="GB">
            {["G", "B"].map((letter, index) => (
              <span key={letter} style={{ "--letter-delay": `${index * 90}ms` }}>
                {letter}
              </span>
            ))}
          </span> */}
          <span className="nav-brand-path text-ink_text-faint">~</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-mono text-[13px]">
          {navLinks.map((link) => (
            <li key={link.path}>
              <a
                href={link.href}
                
                className={`nav-link px-3 py-2 rounded-md transition-colors duration-200 ${
  active === link.href
    ? "text-amber bg-amber/10"
    : "text-ink_text-secondary hover:text-amber hover:bg-amber/5"
}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={(event) => toggleTheme(event)}
            aria-label="Toggle light and dark theme"
            className="theme-toggle w-9 h-9 flex items-center justify-center rounded-md border border-ink-border text-ink_text-secondary hover:text-amber hover:border-amber/40 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="nav-resume inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-md border border-amber/40 text-amber hover:bg-amber hover:text-ink-900 transition-colors"
          >
            <Download size={14} /> resume.pdf
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={(event) => toggleTheme(event)}
            aria-label="Toggle light and dark theme"
            className="theme-toggle w-9 h-9 flex items-center justify-center rounded-md border border-ink-border text-ink_text-secondary"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-ink_text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-900/97 backdrop-blur-md border-b border-ink-border px-5 pb-6">
          <ul className="flex flex-col gap-1 font-mono text-sm pt-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-md text-ink_text-secondary hover:text-amber hover:bg-amber/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resumeUrl}
            download
            onClick={() => setOpen(false)}
            className="nav-resume mt-3 inline-flex items-center gap-2 font-mono text-xs px-4 py-3 rounded-md border border-amber/40 text-amber"
          >
            <Download size={14} /> resume.pdf
          </a>
        </div>
      )}
    </header>
  );
}
