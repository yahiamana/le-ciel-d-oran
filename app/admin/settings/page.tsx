"use client";

import { useState, useEffect } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({
    phone: "",
    address: "",
    hours: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data }));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setMessage("Paramètres sauvegardés avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-foreground">
          Paramètres du Site
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Mettez à jour les informations de contact, les horaires et les réseaux sociaux.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-8 space-y-8 border border-border/50">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold gold-gradient inline-block">Coordonnées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Téléphone
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Horaires d&apos;ouverture
              </label>
              <input
                type="text"
                name="hours"
                value={settings.hours}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-6 border-t border-border/30">
          <h3 className="text-xl font-serif font-semibold gold-gradient inline-block">Réseaux Sociaux</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                WhatsApp Link (wa.me/...)
              </label>
              <input
                type="url"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="pt-6 border-t border-border/30 flex items-center justify-between">
          <p className="text-sm text-green-500">{message}</p>
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  );
}
