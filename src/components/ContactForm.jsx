import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../emailConfig.js";

const initialForm = {
  user_name: "",
  user_email: "",
  message: "",
};

export default function ContactForm() {
  const formRef = useRef(null);
  const clearDraftTimer = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [isOutside, setIsOutside] = useState(false);

  useEffect(() => {
    const formElement = formRef.current;

    const handleOutsidePointer = (event) => {
      if (!formElement?.contains(event.target)) {
        setErrors({});
        setIsOutside(true);
        clearDraftTimer.current = window.setTimeout(() => {
          setForm(initialForm);
          setIsOutside(false);
        }, 520);
      }
    };

    const handleInsideFocus = () => {
      if (clearDraftTimer.current) {
        window.clearTimeout(clearDraftTimer.current);
        clearDraftTimer.current = null;
      }
      setIsOutside(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    formElement?.addEventListener("focusin", handleInsideFocus);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      formElement?.removeEventListener("focusin", handleInsideFocus);
      if (clearDraftTimer.current) window.clearTimeout(clearDraftTimer.current);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "user_name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters.";
        if (!/^[A-Za-z ]+$/.test(value))
          return "Name can contain only letters and spaces.";
        return "";

      case "user_email":
        if (!value.trim()) return "Email is required.";
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        )
          return "Please enter a valid email address.";
        return "";

      case "message":
  if (!value.trim()) return "Message is required.";
  return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      user_name: validateField("user_name", form.user_name),
      user_email: validateField("user_email", form.user_email),
      message: validateField("message", form.message),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={`contact-form space-y-4 text-left ${status === "error" ? "has-submit-error" : ""} ${isOutside ? "is-outside" : ""}`}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className={`form-field ${errors.user_name ? "has-error" : ""}`}>
          <label
            htmlFor="user_name"
            className="block text-xs font-mono text-ink_text-faint mb-1.5"
          >
            Name
          </label>

          <input
            id="user_name"
            name="user_name"
            type="text"
            value={form.user_name}
            onChange={onChange}
            placeholder="Your name"
            aria-invalid={Boolean(errors.user_name)}
            aria-describedby={errors.user_name ? "user_name-error" : undefined}
            className={`form-input w-full rounded-md border px-4 py-3 text-sm bg-ink-800/50 text-ink_text-primary placeholder:text-ink_text-faint outline-none transition-colors ${
              errors.user_name
                ? "border-red-500 focus:border-red-500"
                : "border-ink-border focus:border-amber/50"
            }`}
          />

          {errors.user_name && (
            <p id="user_name-error" role="alert" className="form-error mt-1 text-xs text-red-400">
              {errors.user_name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className={`form-field ${errors.user_email ? "has-error" : ""}`}>
          <label
            htmlFor="user_email"
            className="block text-xs font-mono text-ink_text-faint mb-1.5"
          >
            Email
          </label>

          <input
            id="user_email"
            name="user_email"
            type="email"
            value={form.user_email}
            onChange={onChange}
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.user_email)}
            aria-describedby={errors.user_email ? "user_email-error" : undefined}
            className={`form-input w-full rounded-md border px-4 py-3 text-sm bg-ink-800/50 text-ink_text-primary placeholder:text-ink_text-faint outline-none transition-colors ${
              errors.user_email
                ? "border-red-500 focus:border-red-500"
                : "border-ink-border focus:border-amber/50"
            }`}
          />

          {errors.user_email && (
            <p id="user_email-error" role="alert" className="form-error mt-1 text-xs text-red-400">
              {errors.user_email}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className={`form-field ${errors.message ? "has-error" : ""}`}>
        <label
          htmlFor="message"
          className="block text-xs font-mono text-ink_text-faint mb-1.5"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          placeholder="What would you like to build, ask, or discuss?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`form-input w-full rounded-md border px-4 py-3 text-sm bg-ink-800/50 text-ink_text-primary placeholder:text-ink_text-faint outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-ink-border focus:border-amber/50"
          }`}
        />

        {errors.message && (
          <p id="message-error" role="alert" className="form-error mt-1 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="contact-submit w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber text-ink-900 font-semibold px-7 py-3.5 rounded-md hover:bg-amber-soft transition-colors shadow-[0_0_30px_-8px_rgba(242,169,59,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <p role="status" aria-live="polite" className="form-status form-status-success flex items-center gap-2 text-sm text-teal">
          <CheckCircle2 size={16} />
          Message sent — I'll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p role="alert" aria-live="assertive" className="form-status form-status-error flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} />
          Something went wrong. Please try again, or email me directly.
        </p>
      )}
    </form>
  );
}