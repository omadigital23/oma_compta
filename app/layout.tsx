import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "OMA Compta — Comptabilité SYSCOHADA",
  description: "Logiciel de comptabilité SaaS conforme au SYSCOHADA Révisé pour les PME sénégalaises et ouest-africaines. Gestion comptable, facturation, trésorerie, paie et fiscalité.",
  keywords: "comptabilité, SYSCOHADA, OHADA, Sénégal, FCFA, facturation, PME, Afrique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
