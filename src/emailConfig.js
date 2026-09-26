// ── EmailJS configuration ──────────────────────────────────────────────
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) → copy its "Service ID"
// 3. Create an Email Template with these variable names in the template body:
//      {{user_name}}   {{user_email}}   {{message}}
//    → copy its "Template ID"
// 4. Account → General → copy your "Public Key"
// 5. Paste all three below (or, better, put them in a .env file — see .env.example)
//
// The form in src/components/Contact.jsx already sends user_name, user_email,
// and message — just make sure your EmailJS template uses the same variable
// names shown above.

export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
