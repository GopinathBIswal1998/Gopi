# Akhila Mohan Sahoo — Portfolio

A modern, fully responsive, fully animated developer portfolio built with
**React + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## ⚠️ Required: set up your contact form (EmailJS)

The contact form on the site sends real emails using **EmailJS** — but it needs
your own keys or it won't send anything.

1. Create a free account at **https://www.emailjs.com**
2. **Email Services** → add a service (e.g. connect your Gmail) → copy the **Service ID**
3. **Email Templates** → create a template whose body uses exactly these variables:
   ```
   {{user_name}}
   {{user_email}}
   {{message}}
   ```
   → copy the **Template ID**
4. **Account → General** → copy your **Public Key**
5. Copy `.env.example` to a new file named `.env` in the project root, and paste your three values in:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
6. Restart `npm run dev` (Vite only reads `.env` on startup).

That's the only place you need to add anything — `src/emailConfig.js` reads
these three values automatically. `.env` is already git-ignored, so your keys
never get committed or shipped publicly.

## What's in this version

- **All projects**, in a horizontal scroll carousel — drag with your mouse on
  desktop, swipe natively on mobile, or use the arrow buttons. Fixed the
  layout so it genuinely scrolls sideways on phones instead of breaking.
- **WhatsApp** button in the About section → opens a chat with your number directly.
- **Instagram** link in both About and Contact.
- **Light / Dark theme toggle** in the navbar (sun/moon icon) — remembers the
  user's choice on their next visit, defaults to their system preference the
  first time.
- **Scroll-to-top button** — hidden on the hero, fades in once you scroll past
  it, smooth-scrolls back to the top on click.
- **Contact form** wired to EmailJS (see setup above) — sends straight to your inbox.
- **Animated counters** — every stat number (3+, 100+, 8.9/10, etc.) counts up
  from 0 the moment it scrolls into view.
- **Scroll animations** — every section fades/slides in as you scroll down the page.
- Removed the `GET/POST/200 OK` endpoint-style labels — the color scheme,
  fonts, and layout are otherwise untouched.
- Performance pass to fix scroll jank: lighter background animation, native
  touch scrolling on the project carousel, and `will-change`/reduced-motion
  handling throughout.

## Project structure

```
src/
  components/     # Navbar, Hero, About, Skills, Experience, Projects,
                   # HorizontalScroller, EducationCerts, Contact, ContactForm,
                   # Footer, ScrollToTop, Reveal, AnimatedStat, NetworkBackground,
                   # BrandIcons (GitHub/LinkedIn/WhatsApp/Instagram — hand-drawn
                   # since lucide-react dropped brand logos)
  context/
    ThemeContext.jsx   # light/dark theme provider
  data.js         # ALL your content lives here — edit this file to update
                   # text, skills, projects, experience, links, etc.
  emailConfig.js  # reads your EmailJS keys from .env
  assets/
    profile.jpg   # your photo
public/
  Akhila_Mohan_Sahoo_Resume.pdf   # served at /Akhila_Mohan_Sahoo_Resume.pdf
```

## A few project links need your attention

A handful of projects in `src/data.js` (Gym Management System, ATM Console
Application, Attendance Management System, SmartLeads) are marked with a
`// TODO: point at exact repo` comment — their GitHub link currently falls
back to your profile page because the exact repo slug wasn't available while
building this. Open `src/data.js`, find those entries, and swap in the direct
repo URL (e.g. `https://github.com/Akhila8260/your-repo-name`).

## Updating your content

Everything text-based (name, summary, skills, experience, projects, education,
certifications, links, resume path) lives in **`src/data.js`**.

To change your photo: replace `src/assets/profile.jpg` (same filename), or
update the import path in `src/components/Hero.jsx`.

To update your resume: replace `public/Akhila_Mohan_Sahoo_Resume.pdf` (same
filename), or update `resumeUrl` in `src/data.js`.

## Deploying to GitHub Pages (same setup as your current portfolio)

1. Install the deploy helper:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.js`, set `base: '/your-repo-name/'` (matching your GitHub repo name).
3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. In your GitHub repo settings → Pages, set the source branch to `gh-pages`.

You can also deploy for free on **Vercel** or **Netlify** by just connecting
the GitHub repo — both auto-detect Vite. If you deploy there, add your three
`VITE_EMAILJS_*` values in that platform's environment variables settings
(instead of a `.env` file) so the contact form keeps working in production.
