"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
        Une erreur est survenue
      </h1>
      <p className="text-muted-foreground max-w-md mb-12">
        Nos équipes en cuisine travaillent à résoudre le problème. 
        Veuillez nous excuser pour ce désagrément passager.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-dark-bg font-bold rounded-full transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw size={20} />
          Réessayer
        </button>
        
        <Link 
          href="/"
          className="flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold font-bold rounded-full transition-all hover:bg-gold/10"
        >
          <Home size={20} />
          Accueil
        </Link>
      </div>

      <div className="mt-12">
        <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.2em]">
          Error ID: {error.digest || "unspecified"}
        </p>
      </div>
    </div>
  );
}
