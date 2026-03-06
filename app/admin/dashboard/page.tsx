import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [categoriesCount, dishesCount, galleryCount] = await Promise.all([
    prisma.category.count(),
    prisma.dish.count(),
    prisma.galleryItem.count(),
  ]);

  return (
    <div>
      <div className="mb-8 border-b border-border/50 pb-6">
        <h1 className="text-3xl font-serif font-semibold text-foreground">
          Tableau de bord
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Bienvenue dans l&apos;espace d&apos;administration du Ciel d&apos;Oran.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-card border border-gold/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          <h3 className="text-lg font-medium text-foreground relative z-10">
            Catégories du Menu
          </h3>
          <p className="text-3xl font-bold gold-gradient mt-2 relative z-10">
            {categoriesCount}
          </p>
        </div>

        <div className="p-6 glass-card border border-gold/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          <h3 className="text-lg font-medium text-foreground relative z-10">
            Plats au Total
          </h3>
          <p className="text-3xl font-bold gold-gradient mt-2 relative z-10">
            {dishesCount}
          </p>
        </div>

        <div className="p-6 glass-card border border-gold/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          <h3 className="text-lg font-medium text-foreground relative z-10">
            Images en Galerie
          </h3>
          <p className="text-3xl font-bold gold-gradient mt-2 relative z-10">
            {galleryCount}
          </p>
        </div>
      </div>
    </div>
  );
}
