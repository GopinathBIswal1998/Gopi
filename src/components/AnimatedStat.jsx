import { useEffect, useRef, useState } from "react";

// Parses "100+" -> {prefix:"", number:100, decimals:0, suffix:"+"}
// Parses "8.9/10" -> {prefix:"", number:8.9, decimals:1, suffix:"/10"}
function parseValue(raw) {
  const match = String(raw).match(/^([^\d]*)([\d]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: String(raw) };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, number: parseFloat(numStr), decimals, suffix };
}

export default function AnimatedStat({ value, duration = 1400, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);
  const started = useRef(false);

  const { prefix, number, decimals, suffix } = parseValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(number * eased);
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(number);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [number, duration]);

  const shown = display === null ? 0 : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
