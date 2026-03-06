"use client";

import { useState, useEffect } from "react";
import { User, Lock, Mail, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setEmail(data.email);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setMessage({ type: "success", text: "Profil mis à jour avec succès." });
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground flex items-center gap-3">
          <User className="text-gold" /> Mon Profil
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Gérez vos identifiants d&apos;accès à l&apos;administration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 border border-gold/10">
        {message && (
          <div className={`p-4 rounded-md flex items-center gap-3 ${
            message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
              <Mail size={16} className="text-gold/60" /> Email de l&apos;administrateur
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
              required
            />
          </div>

          <div className="pt-4 border-t border-border/30">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Sécurité & Mot de passe
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Lock size={16} className="text-gold/60" /> Mot de passe actuel (requis pour toute modification)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Nouveau mot de passe (optionnel)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Laisser vide pour ne pas changer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Confirmer le nouveau"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gold hover:bg-gold/90 text-dark-bg font-bold rounded-md transition-all flex items-center justify-center gap-2 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Save size={18} />
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
