"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Connexion au serveur impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Le Ciel d&apos;Oran
            </h1>
            <p className="text-sm font-medium tracking-[0.2em] text-gold mt-2 uppercase">
              Administration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Adresse Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-background/50 border border-border/50 text-foreground px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                className="w-full bg-background/50 border border-border/50 text-foreground px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500/90 bg-red-500/10 p-3 border border-red-500/20 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black font-semibold uppercase tracking-widest py-4 transition-all hover:bg-gold/90 disabled:opacity-50 mt-4"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
