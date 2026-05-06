'use client';

import { BarChart3, FileText, Download, TrendingUp, Scale, PieChart } from 'lucide-react';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const rapports = [
  {
    titre: 'Bilan SYSCOHADA',
    description: 'Actif / Passif conforme au format SYSCOHADA Révisé 2018',
    icon: Scale,
    href: '/rapports/bilan',
    color: 'bg-blue-50 text-blue-600',
    badge: 'Disponible',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    titre: 'Compte de Résultat',
    description: 'Produits et charges — Résultat net SYSCOHADA',
    icon: TrendingUp,
    href: '/rapports/compte-resultat',
    color: 'bg-emerald-50 text-emerald-600',
    badge: 'Disponible',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    titre: 'Flux de Trésorerie (TFT)',
    description: 'Tableau des Flux de Trésorerie — remplace le TAFIRE',
    icon: BarChart3,
    href: '/rapports/flux-tresorerie',
    color: 'bg-amber-50 text-amber-600',
    badge: 'À venir',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    titre: 'Analytique',
    description: 'Analyse par centre de profit, projet ou département',
    icon: PieChart,
    href: '/rapports/analytique',
    color: 'bg-purple-50 text-purple-600',
    badge: 'Phase 5',
    badgeColor: 'bg-gray-50 text-gray-600',
  },
];

// Mock Bilan simplifié
const bilanActif = [
  { poste: 'Immobilisations nettes', montant: 8750000, compte: '21-24' },
  { poste: 'Stocks', montant: 2340000, compte: '3x' },
  { poste: 'Créances clients', montant: 12250000, compte: '411' },
  { poste: 'Trésorerie', montant: 22790000, compte: '52-58' },
];
const bilanPassif = [
  { poste: 'Capital social', montant: 10000000, compte: '101' },
  { poste: 'Réserves & Report', montant: 5480000, compte: '11-12' },
  { poste: 'Résultat net', montant: 7700000, compte: '13' },
  { poste: 'Dettes fournisseurs', montant: 8960000, compte: '401' },
  { poste: 'Dettes fiscales (TVA)', montant: 3940000, compte: '44x' },
  { poste: 'Autres dettes', montant: 8000000, compte: '48x' },
];

export default function RapportsPage() {
  const totalActif = bilanActif.reduce((s, p) => s + p.montant, 0);
  const totalPassif = bilanPassif.reduce((s, p) => s + p.montant, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Rapports financiers</h1>
          <p className="text-sm text-muted-foreground mt-1">États financiers SYSCOHADA Révisé — Exercice 2026</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#1B4332]/20">
          <Download className="w-4 h-4" /> Exporter tout (PDF)
        </button>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
        {rapports.map((rapport) => {
          const Icon = rapport.icon;
          return (
            <div key={rapport.titre} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', rapport.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn('text-[10px] font-semibold px-2 py-1 rounded-full', rapport.badgeColor)}>{rapport.badge}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-[#1B4332] transition-colors">{rapport.titre}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{rapport.description}</p>
              <button className="mt-4 w-full h-8 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Générer
              </button>
            </div>
          );
        })}
      </div>

      {/* Bilan rapide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actif */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-blue-50/50">
            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)]">ACTIF</h3>
            <p className="text-xs text-muted-foreground">Exercice au 31/12/2025</p>
          </div>
          <div className="divide-y divide-border/50">
            {bilanActif.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.poste}</p>
                  <p className="text-[11px] text-muted-foreground font-money">Cpt {p.compte}</p>
                </div>
                <span className="text-sm font-bold font-money text-foreground">{formatFCFA(p.montant)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-3.5 bg-blue-50/50">
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">Total Actif</span>
              <span className="text-base font-bold font-money text-blue-700">{formatFCFA(totalActif)}</span>
            </div>
          </div>
        </div>

        {/* Passif */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-emerald-50/50">
            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)]">PASSIF</h3>
            <p className="text-xs text-muted-foreground">Exercice au 31/12/2025</p>
          </div>
          <div className="divide-y divide-border/50">
            {bilanPassif.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.poste}</p>
                  <p className="text-[11px] text-muted-foreground font-money">Cpt {p.compte}</p>
                </div>
                <span className="text-sm font-bold font-money text-foreground">{formatFCFA(p.montant)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-50/50">
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">Total Passif</span>
              <span className="text-base font-bold font-money text-emerald-700">{formatFCFA(totalPassif)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
