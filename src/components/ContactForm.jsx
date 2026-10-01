import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../emailConfig.js";

const initialForm = {
  user_name: "",
  user_email: "",
  user_mobile: "",
  user_location: "",
  message: "",
};

const locationApi = "https://geocoding-api.open-meteo.com/v1/search";

export default function ContactForm() {
  const formRef = useRef(null);
  const clearDraftTimer = useRef(null);
  const locationRequestRef = useRef(null);
  const locationSearchTimerRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [isOutside, setIsOutside] = useState(false);
  const [locationLoading, setLocationLoading] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationSuggestionsOpen, setLocationSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSearchError, setLocationSearchError] = useState("");

  useEffect(() => {
    const formElement = formRef.current;

    const handleOutsidePointer = (event) => {
      if (!formElement?.contains(event.target)) {
        setErrors({});
        setIsOutside(true);
        setLocationSuggestionsOpen(false);
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

  useEffect(() => () => {
    window.clearTimeout(clearDraftTimer.current);
    window.clearTimeout(locationSearchTimerRef.current);
    locationRequestRef.current?.abort();
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

      case "user_mobile":
        if (!value) return "Mobile number is required.";
        if (!/^\d{10,15}$/.test(value)) return "Enter 10 to 15 digits.";
        return "";

      case "user_location":
        if (!value.trim()) return "Place is required.";
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
      user_mobile: validateField("user_mobile", form.user_mobile),
      user_location: validateField("user_location", form.user_location),
      message: validateField("message", form.message),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const onChange = (e) => {
    const { name } = e.target;
    const value = name === "user_mobile"
      ? e.target.value.replace(/\D/g, "").slice(0, 15)
      : e.target.value;
    setStatus("idle");

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    if (name === "user_location") searchTownNames(value);
  };

  const searchTownNames = (query) => {
    window.clearTimeout(locationSearchTimerRef.current);
    locationRequestRef.current?.abort();
    const normalizedQuery = query.trim();
    setLocationSuggestions([]);
    setLocationSearchError("");
    setActiveSuggestion(-1);

    if (normalizedQuery.length < 2) {
      setLocationLoading(false);
      setLocationSuggestionsOpen(false);
      return;
    }

    setLocationLoading(true);
    setLocationSuggestionsOpen(true);
    locationSearchTimerRef.current = window.setTimeout(async () => {
      const controller = new AbortController();
      locationRequestRef.current = controller;
      const params = new URLSearchParams({
        name: normalizedQuery,
        count: "30",
        language: "en",
        format: "json",
      });

      try {
        const response = await fetch(`${locationApi}?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Place suggestions are unavailable.");
        const result = await response.json();
        const queryLower = normalizedQuery.toLocaleLowerCase();
        const townNames = [...new Set((result.results ?? [])
          .filter((place) => place.feature_code?.startsWith("PPL") && place.name?.toLocaleLowerCase().includes(queryLower))
          .map((place) => place.name))]
          .slice(0, 8);
        if (!controller.signal.aborted) setLocationSuggestions(townNames);
      } catch (error) {
        if (error.name !== "AbortError") setLocationSearchError("Town suggestions are unavailable. You can still enter the place manually.");
      } finally {
        if (!controller.signal.aborted) setLocationLoading(false);
      }
    }, 250);
  };

  const selectTownName = (town) => {
    setForm((previous) => ({ ...previous, user_location: town }));
    setErrors((previous) => ({ ...previous, user_location: "" }));
    setLocationSuggestionsOpen(false);
    setLocationSuggestions([]);
    setStatus("idle");
  };

  const onLocationKeyDown = (event) => {
    if (!locationSuggestionsOpen || !locationSuggestions.length) {
      if (event.key === "Escape") setLocationSuggestionsOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % locationSuggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((current) => (current <= 0 ? locationSuggestions.length - 1 : current - 1));
    } else if (event.key === "Enter" && activeSuggestion >= 0) {
      event.preventDefault();
      selectTownName(locationSuggestions[activeSuggestion]);
    } else if (event.key === "Escape") {
      setLocationSuggestionsOpen(false);
    }
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`form-field ${errors.user_mobile ? "has-error" : ""}`}>
          <label htmlFor="user_mobile" className="block text-xs font-mono text-ink_text-faint mb-1.5">
            Mobile number
          </label>
          <input
            id="user_mobile"
            name="user_mobile"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            pattern="[0-9]{10,15}"
            maxLength={15}
            value={form.user_mobile}
            onChange={onChange}
            placeholder="10–15 digits"
            aria-invalid={Boolean(errors.user_mobile)}
            aria-describedby={errors.user_mobile ? "user_mobile-error" : undefined}
            className={`form-input w-full rounded-md border px-4 py-3 text-sm bg-ink-800/50 text-ink_text-primary placeholder:text-ink_text-faint outline-none ${errors.user_mobile ? "border-red-500" : "border-ink-border focus:border-amber/50"}`}
          />
          {errors.user_mobile && <p id="user_mobile-error" role="alert" className="form-error mt-1 text-xs text-red-400">{errors.user_mobile}</p>}
        </div>

        <div className={`form-field ${errors.user_location ? "has-error" : ""}`}>
          <label className="block text-xs font-mono text-ink_text-faint mb-1.5">Place you’re connecting from</label>
          <div className="location-autocomplete">
            <input
            id="user_location"
            name="user_location"
            type="text"
            autoComplete="off"
            value={form.user_location}
            onChange={onChange}
            onKeyDown={onLocationKeyDown}
            onFocus={() => form.user_location.trim().length >= 2 && setLocationSuggestionsOpen(true)}
            placeholder="Start typing a town name"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={locationSuggestionsOpen && locationSuggestions.length > 0}
            aria-controls="town-suggestions"
            aria-activedescendant={activeSuggestion >= 0 ? `town-option-${activeSuggestion}` : undefined}
            aria-invalid={Boolean(errors.user_location)}
            aria-describedby={errors.user_location ? "user_location-error" : undefined}
            className={`location-picker-trigger form-input w-full rounded-md border px-4 py-3 text-sm outline-none ${errors.user_location ? "border-red-500" : "border-ink-border focus:border-amber/50"}`}
            />
            <MapPin className="location-input-icon" size={16} aria-hidden="true" />
            {locationSuggestionsOpen && (locationLoading || locationSearchError || locationSuggestions.length > 0) && (
              <div id="town-suggestions" className="town-suggestions" role="listbox" aria-label="Matching town names">
                {locationLoading && <div className="town-suggestions-status" role="status">Finding town names…</div>}
                {!locationLoading && locationSuggestions.map((town, index) => (
                  <button
                    id={`town-option-${index}`}
                    key={`${town}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={activeSuggestion === index}
                    className={`town-suggestion ${activeSuggestion === index ? "is-active" : ""}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectTownName(town)}
                  >
                    {town}
                  </button>
                ))}
                {!locationLoading && locationSuggestions.length === 0 && (
                  <div className="town-suggestions-status" role="status">
                    {locationSearchError || "No matching town names. You can keep your place typed in."}
                  </div>
                )}
              </div>
            )}
          </div>
          {errors.user_location && <p id="user_location-error" role="alert" className="form-error mt-1 text-xs text-red-400">{errors.user_location}</p>}
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
        aria-busy={status === "sending"}
        className={`contact-submit w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-md disabled:opacity-60 disabled:cursor-not-allowed ${status === "sending" ? "is-sending" : ""} ${status === "success" ? "is-sent" : ""}`}
      >
        {status === "sending" ? (
          <>
            <Send size={18} className="send-flight-icon" />
            Sending...
          </>
        ) : (
          <>
            {status === "success" ? <CheckCircle2 size={18} /> : <Send size={18} />}
            {status === "success" ? "Message Sent" : "Send Message"}
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