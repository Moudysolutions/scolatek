import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScolaTek - Plateforme de Gestion Scolaire | Moudy Solutions",
  description: "ScolaTek révolutionne la gestion de votre établissement scolaire. Notes, bulletins, emplois du temps, paiements – tout centralisé dans une plateforme intuitive.",
  keywords: ["gestion scolaire", "école", "notes", "bulletins", "Niger", "Moudy Solutions"],
  authors: [{ name: "Moudy Solutions", url: "https://moudy-solutions.com" }],
  openGraph: {
    title: "ScolaTek - Plateforme de Gestion Scolaire",
    description: "La plateforme de gestion scolaire nouvelle génération pour les établissements africains.",
    url: "https://scolatek.site",
    siteName: "ScolaTek",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
