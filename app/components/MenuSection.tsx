"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Dish {
  id: string;
  nameFr: string;
  nameAr: string;
  description?: string;
  price: string;
}

interface Category {
  id: string;
  titleFr: string;
  titleAr: string;
  dishes: Dish[];
}

export default function MenuSection() {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const degustationMenu = {
    titleFr: "Menu dégustation 5 services",
    titleAr: "قائمة تذوق ٥ أطباق – بالحجز المسبق",
    price: "8 500 DZD / personne",
    note: "Sur réservation uniquement",
  };

  if (loading) {
    return (
      <section id="menu" className="section-padding flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gold tracking-widest uppercase text-sm">Chargement du menu...</div>
      </section>
    );
  }

  return (
    <section id="menu" className="section-padding" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
           <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Saveurs célestes
          </p>
          <h2 className="section-title">Notre Carte</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Une sélection raffinée, évoluant au rythme des saisons et des inspirations de notre chef.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24">
          {menuData.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Category Title */}
              <div className="mb-8 text-center md:text-left">
                <h3 className="font-serif text-3xl font-semibold text-foreground tracking-wide">
                  {cat.titleFr}
                </h3>
                <p className="text-arabic mt-1 text-sm text-gold opacity-80">
                  {cat.titleAr}
                </p>
                <div className="w-12 border-b border-gold/40 mt-4 mx-auto md:mx-0" />
              </div>

              {/* Dishes */}
              <div className="space-y-8">
                {cat.dishes.map((dish, di) => (
                  <motion.div
                    key={dish.nameFr}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: di * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                        {dish.nameFr}
                      </h4>
                      {/* Dotted Leader */}
                      <div className="flex-1 border-b border-dotted border-border/60 mx-2 hidden sm:block relative top-[-6px]" />
                      <span className="shrink-0 font-serif text-base font-semibold text-gold whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-arabic mt-0.5 text-xs text-muted-foreground opacity-70">
                      {dish.nameAr}
                    </p>
                    {dish.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-[90%]">
                        {dish.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dégustation Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center max-w-2xl mx-auto border border-gold/20 p-10 rounded-sm relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gold/5 opacity-50 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              {degustationMenu.titleFr}
            </h3>
            <p className="text-arabic mt-2 text-sm text-gold opacity-80">
              {degustationMenu.titleAr}
            </p>
            <div className="my-6 text-3xl md:text-4xl font-serif font-bold gold-gradient flex justify-center">
               {degustationMenu.price}
            </div>
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              {degustationMenu.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
