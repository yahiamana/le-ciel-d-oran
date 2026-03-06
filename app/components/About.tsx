"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Notre histoire
            </p>
            <h2 className="section-title !text-left !mb-4">
              À propos
            </h2>
            <div className="gold-divider !mx-0 !my-4" />
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Le Ciel d&apos;Oran est un restaurant gastronomique qui sublime les
              produits locaux avec des techniques modernes. Menu saisonnier, carte
              de vins sélectionnée et service attentif.
            </p>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Idéal pour dîners d&apos;affaires, soirées romantiques et événements
              privés. Notre chef crée des plats qui racontent l&apos;histoire de la
              Méditerranée à travers chaque saveur.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient-bg text-xs text-background">✦</span>
                <span className="text-muted-foreground">Produits locaux</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient-bg text-xs text-background">✦</span>
                <span className="text-muted-foreground">Menu saisonnier</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient-bg text-xs text-background">✦</span>
                <span className="text-muted-foreground">Vins sélectionnés</span>
              </div>
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,134,11,0.2), rgba(12,10,9,0.8))",
                }}
              >
                <div className="flex h-full items-center justify-center text-gold opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
              <div
                className="aspect-square rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(225deg, rgba(212,168,67,0.3), rgba(12,10,9,0.7))",
                }}
              >
                <div className="flex h-full items-center justify-center text-gold opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div
                className="aspect-square rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(315deg, rgba(184,134,11,0.25), rgba(12,10,9,0.75))",
                }}
              >
                <div className="flex h-full items-center justify-center text-gold opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                  </svg>
                </div>
              </div>
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(212,168,67,0.2), rgba(12,10,9,0.8))",
                }}
              >
                <div className="flex h-full items-center justify-center text-gold opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
