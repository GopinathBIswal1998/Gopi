import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable — fall through to system preference
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore write failures (private browsing, etc.)
    }
  }, [theme]);

  const toggleTheme = (event) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    if (event?.clientX !== undefined && event?.clientY !== undefined) {
      root.style.setProperty("--theme-origin-x", `${event.clientX}px`);
      root.style.setProperty("--theme-origin-y", `${event.clientY}px`);
    }

    const updateTheme = () => {
      root.setAttribute("data-theme", nextTheme);
      flushSync(() => setTheme(nextTheme));
    };

    if (document.startViewTransition) {
      document.startViewTransition(updateTheme);
      return;
    }

    root.classList.remove("theme-transitioning");
    void root.offsetWidth;
    root.classList.add("theme-transitioning");
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 1200);
    updateTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
