import { profile } from "../data.js";

export default function Footer() {
  return (
    <footer className="border-t border-ink-border py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-center text-center font-mono text-xs text-ink_text-faint">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}