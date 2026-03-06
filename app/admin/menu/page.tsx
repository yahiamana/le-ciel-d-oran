"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

type Dish = {
  id: string;
  nameFr: string;
  nameAr: string;
  description: string;
  price: string;
};

type Category = {
  id: string;
  titleFr: string;
  titleAr: string;
  dishes: Dish[];
};

export default function AdminMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // New Category State
  const [newCatFr, setNewCatFr] = useState("");
  const [newCatAr, setNewCatAr] = useState("");

  // New Dish State
  const [selectedCatId, setSelectedCatId] = useState("");
  const [newDishFr, setNewDishFr] = useState("");
  const [newDishAr, setNewDishAr] = useState("");
  const [newDishDesc, setNewDishDesc] = useState("");
  const [newDishPrice, setNewDishPrice] = useState("");

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatFr || !newCatAr) return;

    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "category", titleFr: newCatFr, titleAr: newCatAr }),
    });
    setNewCatFr("");
    setNewCatAr("");
    fetchMenu();
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCatId || !newDishFr || !newDishPrice) return;

    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "dish",
        categoryId: selectedCatId,
        nameFr: newDishFr,
        nameAr: newDishAr,
        description: newDishDesc,
        price: newDishPrice,
      }),
    });
    setNewDishFr("");
    setNewDishAr("");
    setNewDishDesc("");
    setNewDishPrice("");
    fetchMenu();
  };

  const handleDelete = async (id: string, type: "category" | "dish") => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    await fetch(`/api/menu/delete?id=${id}&type=${type}`, { method: "DELETE" });
    fetchMenu();
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-foreground">
          Gestion du Menu
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Gérez vos catégories et plats affichés sur le site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forms Sidebar */}
        <div className="space-y-8">
          {/* Add Category */}
          <div className="glass-card p-6 border border-border/50">
            <h3 className="text-lg font-medium mb-4">Nouvelle Catégorie</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Titre (ex: Entrées)"
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
                value={newCatFr}
                onChange={(e) => setNewCatFr(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Titre Arabe (ex: مقبلات)"
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm text-right focus:border-gold outline-none"
                dir="rtl"
                value={newCatAr}
                onChange={(e) => setNewCatAr(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-gold text-black py-2 text-sm font-medium hover:bg-gold/90 transition-colors">
                Ajouter
              </button>
            </form>
          </div>

          {/* Add Dish */}
          <div className="glass-card p-6 border border-border/50">
            <h3 className="text-lg font-medium mb-4">Nouveau Plat</h3>
            <form onSubmit={handleAddDish} className="space-y-4">
              <select
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.titleFr}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Nom du plat (ex: Tartare de thon)"
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
                value={newDishFr}
                onChange={(e) => setNewDishFr(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Nom Arabe (ex: تارتار تونة)"
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm text-right focus:border-gold outline-none"
                dir="rtl"
                value={newDishAr}
                onChange={(e) => setNewDishAr(e.target.value)}
              />
              <textarea
                placeholder="Description complète du plat..."
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none h-20 resize-none"
                value={newDishDesc}
                onChange={(e) => setNewDishDesc(e.target.value)}
              />
              <input
                type="text"
                placeholder="Prix (ex: 1 200 DZD)"
                className="w-full bg-background/50 border border-border/50 px-3 py-2 text-sm focus:border-gold outline-none"
                value={newDishPrice}
                onChange={(e) => setNewDishPrice(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-gold text-black py-2 text-sm font-medium hover:bg-gold/90 transition-colors">
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* Categories List View */}
        <div className="lg:col-span-2 space-y-6">
          {categories.length === 0 ? (
            <div className="text-center p-12 glass-card border-dashed">
              <p className="text-muted-foreground">Aucune catégorie dans le menu.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="glass-card p-6 border border-border/30">
                <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">
                      {cat.titleFr}
                    </h3>
                    <p className="text-sm text-gold opacity-80 mt-1">{cat.titleAr}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(cat.id, "category")}
                    className="text-red-400 hover:text-red-300 p-2"
                    title="Supprimer la catégorie"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {cat.dishes.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Aucun plat.</p>
                  ) : (
                    cat.dishes.map((dish) => (
                      <div key={dish.id} className="flex justify-between items-start group rounded-md p-3 hover:bg-muted/30 transition-colors border border-transparent hover:border-border/30">
                        <div className="flex-1 pr-4">
                          <h4 className="font-medium text-sm text-foreground">
                            {dish.nameFr}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 max-w-sm line-clamp-1">
                            {dish.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gold whitespace-nowrap">
                            {dish.price}
                          </span>
                          <button
                            onClick={() => handleDelete(dish.id, "dish")}
                            className="text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
