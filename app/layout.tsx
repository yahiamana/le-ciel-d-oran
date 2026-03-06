import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const fontArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});
import ThemeProvider from "./components/ThemeProvider";
import LenisProvider from "./components/LenisProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Le Ciel d'Oran — Restaurant gastronomique méditerranéen",
  description:
    "Le Ciel d'Oran : cuisine moderne méditerranéenne, ingrédients locaux, menu saisonnier et service attentif. Réservez votre table à Oran.",
  keywords: [
    "restaurant Oran",
    "gastronomique",
    "méditerranéen",
    "Le Ciel d'Oran",
    "réservation restaurant",
    "fine dining Algérie",
  ],
  openGraph: {
    title: "Le Ciel d'Oran — Restaurant gastronomique",
    description:
      "Cuisine moderne méditerranéenne, ingrédients locaux — une expérience culinaire céleste à Oran.",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Ciel d'Oran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Ciel d'Oran",
    description: "Restaurant gastronomique méditerranéen à Oran.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${fontSans.variable} ${fontSerif.variable} ${fontArabic.variable}`}>
      <head>
        {/* Prevent FOUC — set dark theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cieldoran-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
