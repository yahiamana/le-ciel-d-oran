"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, UtensilsCrossed, Image as ImageIcon, Settings, User } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-muted/20 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-xl font-serif font-bold text-foreground">
            Le Ciel d&apos;Oran
          </h2>
          <p className="text-xs tracking-widest text-gold mt-1 uppercase">Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <LayoutDashboard size={18} />
            Tableau de bord
          </Link>
          <Link
            href="/admin/menu"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <UtensilsCrossed size={18} />
            Menu & Plats
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <ImageIcon size={18} />
            Galerie
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <Settings size={18} />
            Paramètres
          </Link>
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <User size={18} />
            Mon Profil
          </Link>
        </nav>

        <div className="p-4 border-t border-border/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background p-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
