import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScroller({ children }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
    setTimeout(updateEdges, 400);
  };

  // NOTE: no wheel handler here on purpose — a previous version converted
  // vertical mouse-wheel scroll into horizontal card scroll, which blocked
  // normal page scrolling while the cursor was over this section. Removed.
  // NOTE: no drag-to-scroll either — it was fighting with normal clicks/
  // scroll. Touch devices already swipe natively; desktop uses the arrows.

  return (
    <div className="relative">
      {/* Left arrow — vertically centered on the left edge of the row */}
      <button
        onClick={() => scrollByAmount(-1)}
        disabled={atStart}
        aria-label="Scroll projects left"
        className="hidden sm:flex absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-ink-border bg-ink-900/90 backdrop-blur text-ink_text-secondary hover:text-amber hover:border-amber/40 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-lg"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right arrow — vertically centered on the right edge of the row */}
      <button
        onClick={() => scrollByAmount(1)}
        disabled={atEnd}
        aria-label="Scroll projects right"
        className="hidden sm:flex absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-ink-border bg-ink-900/90 backdrop-blur text-ink_text-secondary hover:text-amber hover:border-amber/40 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-lg"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="no-scrollbar flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-proximity pt-3 pb-4"
      >
        {children}
      </div>

      {/* Left fade */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-4 w-10 sm:w-16 bg-gradient-to-r from-ink-900 to-transparent transition-opacity duration-300 ${
          atStart ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Right fade */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-4 w-10 sm:w-16 bg-gradient-to-l from-ink-900 to-transparent transition-opacity duration-300 ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}