"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    nameFr: "Amina B.",
    textFr:
      "Une expérience culinaire exceptionnelle. Le magret de canard était parfaitement cuit, et l'ambiance du restaurant est tout simplement magique. On s'y sent transporté.",
    textAr: "تجربة طعام استثنائية. صدر البطة كان مطبوخاً بإتقان والأجواء ساحرة.",
    role: "Blogueuse culinaire",
    stars: 5,
  },
  {
    nameFr: "Karim M.",
    textFr:
      "Le meilleur restaurant d'Oran, sans hésiter. Le menu dégustation est un voyage sensoriel incroyable. Service impeccable et carte des vins remarquable.",
    textAr: "أفضل مطعم في وهران بدون تردد. قائمة التذوق رحلة حسية لا تُنسى.",
    role: "Homme d'affaires",
    stars: 5,
  },
  {
    nameFr: "Sarah T.",
    textFr:
      "Notre soirée d'anniversaire au Ciel d'Oran restera un souvenir inoubliable. L'équipe a tout fait pour rendre ce moment parfait. La burrata aux agrumes était divine.",
    textAr: "سهرة عيد ميلادنا في لو سيل دي وهران ستبقى ذكرى لا تُنسى. البوراتا كانت رائعة.",
    role: "Avocate",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gold"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Ils nous font confiance
          </p>
          <h2 className="section-title">Avis de nos clients</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Ce sont nos clients qui en parlent le mieux.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.nameFr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <div>
                <Stars count={t.stars} />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.textFr}&rdquo;
                </p>
                <p className="text-arabic mt-3 text-xs text-muted-foreground opacity-60 leading-relaxed">
                  &ldquo;{t.textAr}&rdquo;
                </p>
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient-bg text-xs font-bold text-background">
                  {t.nameFr.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.nameFr}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
