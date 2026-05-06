'use client';

import { Calculator, AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const declarations = [
  { mois: 'Avril 2026', deadline: '15/05/2026', tva_collectee: 2340000, tva_recup: 890000, tva_nette: 1450000, statut: 'en_cours' as const },
  { mois: 'Mars 2026', deadline: '15/04/2026', tva_collectee: 1980000, tva_recup: 760000, tva_nette: 1220000, statut: 'payee' as const },
  { mois: 'Février 2026', deadline: '15/03/2026', tva_collectee: 2150000, tva_recup: 920000, tva_nette: 1230000, statut: 'payee' as const },
  { mois: 'Janvier 2026', deadline: '15/02/2026', tva_collectee: 1670000, tva_recup: 540000, tva_nette: 1130000, statut: 'payee' as const },
];

export default function TVAPage() {
  const current = declarations[0];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Déclarations TVA</h1>
        <p className="text-sm text-muted-foreground mt-1">Fiscalité sénégalaise — Taux 18% standard / 10% tourisme • Échéance : 15 du mois suivant</p>
      </div>

      {/* Current period alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-900">Déclaration TVA Avril 2026 — À déposer avant le 15/05/2026</p>
          <p className="text-xs text-amber-700 mt-0.5">TVA nette à reverser à la DGID : <span className="font-bold font-money">{formatFCFA(current.tva_nette)}</span></p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
          Valider & Déposer
        </button>
      </div>

      {/* Current declaration breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TVA Collectée</span>
          </div>
          <p className="text-2xl font-bold font-money text-foreground">{formatFCFA(current.tva_collectee)}</p>
          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex justify-between"><span>Base 18% :</span><span className="font-money font-semibold">{formatFCFA(13000000)}</span></div>
            <div className="flex justify-between"><span>TVA 18% :</span><span className="font-money font-semibold">{formatFCFA(2340000)}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TVA Récupérable</span>
          </div>
          <p className="text-2xl font-bold font-money text-emerald-700">{formatFCFA(current.tva_recup)}</p>
          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex justify-between"><span>Achats :</span><span className="font-money font-semibold">{formatFCFA(650000)}</span></div>
            <div className="flex justify-between"><span>Services :</span><span className="font-money font-semibold">{formatFCFA(240000)}</span></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">TVA Nette à Payer</span>
          </div>
          <p className="text-2xl font-bold font-money">{formatFCFA(current.tva_nette)}</p>
          <p className="text-xs text-white/60 mt-1">TVA collectée − TVA récupérable</p>
        </div>
      </div>

      {/* Declarations history */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-heading)]">Historique des déclarations</h3>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Télécharger tout
          </button>
        </div>
        <div className="divide-y divide-border/50">
          {declarations.map((d, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', d.statut === 'payee' ? 'bg-emerald-50' : 'bg-amber-50')}>
                  {d.statut === 'payee' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{d.mois}</p>
                  <p className="text-xs text-muted-foreground">Échéance : {d.deadline}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold font-money text-foreground">{formatFCFA(d.tva_nette)}</p>
                <span className={cn('text-[11px] font-semibold', d.statut === 'payee' ? 'text-emerald-600' : 'text-amber-600')}>
                  {d.statut === 'payee' ? 'Payée' : 'En cours'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
