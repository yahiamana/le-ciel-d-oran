import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-serif font-black text-gold/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-serif font-medium text-gold tracking-widest uppercase">
            Plat Introuvable
          </p>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-md mb-12 text-lg">
        Il semblerait que cette page ne figure pas à notre menu. 
        Laissez-nous vous reconduire à notre table.
      </p>

      <Link 
        href="/"
        className="group flex items-center gap-3 px-8 py-4 bg-gold text-dark-bg font-bold rounded-full transition-all hover:scale-105 active:scale-95"
      >
        <MoveLeft className="group-hover:-translate-x-1 transition-transform" />
        Retour à l&apos;accueil
      </Link>
      
      <div className="mt-24 border-t border-gold/10 pt-8 w-full max-w-xs">
        <p className="text-xs tracking-widest text-gold/40 uppercase">
          Le Ciel d&apos;Oran
        </p>
      </div>
    </div>
  );
}
