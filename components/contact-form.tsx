"use client";

import { useState } from "react";

type FormState = {
  navn: string;
  epost: string;
  telefon: string;
  melding: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  navn: "",
  epost: "",
  telefon: "",
  melding: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.navn.trim()) {
    errors.navn = "Vennligst fyll inn navn.";
  }

  if (!values.epost.trim()) {
    errors.epost = "Vennligst fyll inn e-post.";
  } else if (!EMAIL_PATTERN.test(values.epost.trim())) {
    errors.epost = "Vennligst fyll inn en gyldig e-postadresse.";
  }

  if (!values.melding.trim()) {
    errors.melding = "Vennligst fyll inn en melding.";
  }

  return errors;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: hidden field that real users never fill. Bots often do.
  const [nettside, setNettside] = useState("");

  function handleChange(
    field: keyof FormState,
  ): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, nettside }),
      });
      if (!res.ok) throw new Error("Sending feilet");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm bg-brand-bg p-8 text-center"
      >
        <p className="font-serif text-xl text-brand-slate">
          Takk! Vi tar kontakt så snart som mulig.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot – hidden from users, off-screen and skipped by keyboard. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="nettside">Ikke fyll ut dette feltet</label>
        <input
          id="nettside"
          name="nettside"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={nettside}
          onChange={(e) => setNettside(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="navn"
          className="block text-sm font-medium text-brand-slate"
        >
          Navn
        </label>
        <input
          id="navn"
          name="navn"
          type="text"
          value={values.navn}
          onChange={handleChange("navn")}
          aria-invalid={Boolean(errors.navn)}
          aria-describedby={errors.navn ? "navn-error" : undefined}
          className="mt-2 w-full rounded-sm border border-brand-slate/20 bg-white px-4 py-2.5 text-brand-slate outline-none transition-colors focus:border-brand-orange"
        />
        {errors.navn && (
          <p id="navn-error" className="mt-1.5 text-sm text-brand-error">
            {errors.navn}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="epost"
          className="block text-sm font-medium text-brand-slate"
        >
          E-post
        </label>
        <input
          id="epost"
          name="epost"
          type="email"
          value={values.epost}
          onChange={handleChange("epost")}
          aria-invalid={Boolean(errors.epost)}
          aria-describedby={errors.epost ? "epost-error" : undefined}
          className="mt-2 w-full rounded-sm border border-brand-slate/20 bg-white px-4 py-2.5 text-brand-slate outline-none transition-colors focus:border-brand-orange"
        />
        {errors.epost && (
          <p id="epost-error" className="mt-1.5 text-sm text-brand-error">
            {errors.epost}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="telefon"
          className="block text-sm font-medium text-brand-slate"
        >
          Telefon <span className="text-brand-gray">(valgfritt)</span>
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          value={values.telefon}
          onChange={handleChange("telefon")}
          className="mt-2 w-full rounded-sm border border-brand-slate/20 bg-white px-4 py-2.5 text-brand-slate outline-none transition-colors focus:border-brand-orange"
        />
      </div>

      <div>
        <label
          htmlFor="melding"
          className="block text-sm font-medium text-brand-slate"
        >
          Melding
        </label>
        <textarea
          id="melding"
          name="melding"
          rows={5}
          value={values.melding}
          onChange={handleChange("melding")}
          aria-invalid={Boolean(errors.melding)}
          aria-describedby={errors.melding ? "melding-error" : undefined}
          className="mt-2 w-full rounded-sm border border-brand-slate/20 bg-white px-4 py-2.5 text-brand-slate outline-none transition-colors focus:border-brand-orange"
        />
        {errors.melding && (
          <p id="melding-error" className="mt-1.5 text-sm text-brand-error">
            {errors.melding}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-brand-error">
          Beklager, meldingen kunne ikke sendes akkurat nå. Prøv igjen, eller
          ring oss på {" "}
          <a href="tel:+4794851228" className="font-medium underline">
            948 51 228
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-sm bg-brand-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sender …" : "Send melding"}
      </button>
    </form>
  );
}
