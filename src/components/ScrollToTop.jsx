import { useEffect, useRef, useState } from "react";
import { ChevronsUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [returning, setReturning] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // visible once the hero section has scrolled mostly out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-90% 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => {
      observer.disconnect();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const scrollUp = () => {
    if (returning) return;

    const start = window.scrollY;
    const duration = 1500;
    const startedAt = performance.now();
    setReturning(true);
    setProgress(0);

    const animate = (timestamp) => {
      const elapsed = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      window.scrollTo(0, start * (1 - eased));
      setProgress(elapsed * 100);

      if (elapsed < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        animationFrame.current = null;
        setReturning(false);
        setProgress(0);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
  };

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      aria-busy={returning}
      style={{ "--scroll-progress": `${progress}%` }}
      className={`scroll-top-control fixed bottom-6 right-5 sm:right-8 z-40 text-amber transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="scroll-top-orbit" aria-hidden="true" />
      <span className="scroll-top-core">
        <ChevronsUp size={25} strokeWidth={2.5} />
      </span>
      <span className="scroll-top-trail" aria-hidden="true" />
    </button>
  );
}