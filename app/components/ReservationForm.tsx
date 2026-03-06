"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().regex(/^0[567]\d{8}$/, "Numéro de téléphone invalide (ex: 0551234567)"),
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner une heure"),
  guests: z.string().min(1, "Veuillez indiquer le nombre de personnes"),
  message: z.string().optional(),
});

type FormErrors = Partial<Record<keyof z.infer<typeof reservationSchema>, string>>;

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (field) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    // Simulate API call (Phase 2 = real API)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  const inputClasses =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold/30";

  // Min date = today
  const today = new Date().toISOString().split("T")[0];

  if (status === "success") {
    return (
      <section id="reservation" className="section-padding">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gold-gradient-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C0A09" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Réservation confirmée !
            </h3>
            <p className="mt-2 text-muted-foreground">
              Merci {formData.name}. Nous vous attendons le{" "}
              <span className="text-gold font-semibold">{formData.date}</span> à{" "}
              <span className="text-gold font-semibold">{formData.time}</span> pour{" "}
              <span className="text-gold font-semibold">{formData.guests}</span> personne(s).
            </p>
            <p className="text-arabic mt-3 text-sm text-muted-foreground opacity-70">
              شكراً لك! تم تأكيد حجزك
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", phone: "", date: "", time: "", guests: "2", message: "" });
              }}
              className="btn-outline mt-6"
            >
              Nouvelle réservation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="section-padding">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Votre table vous attend
          </p>
          <h2 className="section-title">Réservation</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Réservez votre table pour une soirée inoubliable au Ciel d&apos;Oran.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 space-y-5"
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="res-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Nom complet
              </label>
              <input
                id="res-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className={inputClasses}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && <p id="err-name" className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="res-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Téléphone
              </label>
              <input
                id="res-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0551234567"
                className={inputClasses}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && <p id="err-phone" className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="res-date" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </label>
              <input
                id="res-date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className={inputClasses}
                aria-invalid={!!errors.date}
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label htmlFor="res-time" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heure
              </label>
              <select
                id="res-time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={inputClasses}
                aria-invalid={!!errors.time}
              >
                <option value="">Choisir l&apos;heure</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
              </select>
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="res-guests" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Nombre de personnes
            </label>
            <select
              id="res-guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className={inputClasses}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                <option key={n} value={n.toString()}>
                  {n} {n === 1 ? "personne" : "personnes"}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="res-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Message (optionnel)
            </label>
            <textarea
              id="res-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Allergies, occasion spéciale, demandes..."
              className={inputClasses + " resize-none"}
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileTap={{ scale: 0.97 }}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Réservation en cours…
              </span>
            ) : (
              "Confirmer la réservation"
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
