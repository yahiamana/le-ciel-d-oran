"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

type GalleryItem = {
  id: string;
  alt: string;
  src: string;
  order: number;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAlt, setNewAlt] = useState("");
  const [newSrc, setNewSrc] = useState("");
  const [newOrder, setNewOrder] = useState("");

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlt || !newSrc) return;

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: newAlt, src: newSrc, order: parseInt(newOrder) || 0 }),
    });
    setNewAlt("");
    setNewSrc("");
    setNewOrder("");
    fetchGallery();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette image de la galerie ?")) return;
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    fetchGallery();
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-foreground">
          Gestion de la Galerie
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Ajoutez et supprimez les photographies affichées sur le site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="glass-card p-6 border border-border/50 h-fit">
          <h3 className="text-lg font-medium mb-4">Nouvelle Image</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <input
              type="text"
              placeholder="Texte alternatif (Description)"
              className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Chemin d'accès (ex: /gallery/image1.png)"
              className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              value={newSrc}
              onChange={(e) => setNewSrc(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Ordre (ex: 1)"
              className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
            />
            <button type="submit" className="w-full bg-gold text-black py-2 text-sm font-medium hover:bg-gold/90 transition-colors">
              Ajouter l&apos;image
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-2">
          {images.length === 0 ? (
            <div className="text-center p-12 glass-card border-dashed">
              <p className="text-muted-foreground">La galerie est vide.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-md overflow-hidden aspect-square border border-border/30">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="self-end text-red-400 hover:text-red-300 bg-black/50 rounded-full p-2"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="text-xs text-white line-clamp-2">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
