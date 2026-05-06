'use client';

import { Download } from 'lucide-react';
import { MOCK_ECRITURES } from '@/lib/mock-data-phase2';
import { PLAN_COMPTABLE_SYSCOHADA, CLASSES_COMPTABLES } from '@/lib/accounting/plan-comptable';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

function buildBalance() {
  const map: Record<string, { debit: number; credit: number }> = {};
  MOCK_ECRITURES.forEach(e => e.lignes.forEach(l => {
    if (!map[l.compte]) map[l.compte] = { debit: 0, credit: 0 };
    map[l.compte].debit += l.debit;
    map[l.compte].credit += l.credit;
  }));
  return Object.entries(map).map(([numero, data]) => {
    const plan = PLAN_COMPTABLE_SYSCOHADA.find(c => c.numero === numero);
    const classe = parseInt(numero[0]);
    const soldeDeb = Math.max(0, data.debit - data.credit);
    const soldeCre = Math.max(0, data.credit - data.debit);
    return { numero, intitule: plan?.intitule || 'Compte divers', classe, ...data, soldeDeb, soldeCre };
  }).sort((a, b) => a.numero.localeCompare(b.numero));
}

export default function BalancePage() {
  const balance = buildBalance();
  const totalDebit = balance.reduce((s, c) => s + c.debit, 0);
  const totalCredit = balance.reduce((s, c) => s + c.credit, 0);
  const totalSoldeDeb = balance.reduce((s, c) => s + c.soldeDeb, 0);
  const totalSoldeCre = balance.reduce((s, c) => s + c.soldeCre, 0);
  const equilibre = Math.abs(totalDebit - totalCredit) < 0.01;

  // Group by class
  const byClasse = CLASSES_COMPTABLES.map(cl => ({
    ...cl,
    comptes: balance.filter(c => c.classe === cl.numero),
  })).filter(cl => cl.comptes.length > 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Balance générale</h1>
          <p className="text-sm text-muted-foreground mt-1">SYSCOHADA Révisé — Exercice 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn('text-xs font-semibold px-3 py-1.5 rounded-full border',
            equilibre ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200')}>
            {equilibre ? '✓ Balance équilibrée' : '⚠ Déséquilibre'}
          </div>
          <button className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Mvt Débit</p>
          <p className="text-lg font-bold font-money text-blue-700">{formatFCFA(totalDebit)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Mvt Crédit</p>
          <p className="text-lg font-bold font-money text-red-700">{formatFCFA(totalCredit)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Solde Débiteur</p>
          <p className="text-lg font-bold font-money text-emerald-700">{formatFCFA(totalSoldeDeb)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Solde Créditeur</p>
          <p className="text-lg font-bold font-money text-amber-700">{formatFCFA(totalSoldeCre)}</p>
        </div>
      </div>

      {/* Balance table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1B4332] text-white">
              <th className="text-left text-xs font-semibold px-5 py-3 uppercase tracking-wider">Compte</th>
              <th className="text-left text-xs font-semibold px-5 py-3 uppercase tracking-wider">Intitulé</th>
              <th className="text-right text-xs font-semibold px-5 py-3 uppercase tracking-wider">Mvt Débit</th>
              <th className="text-right text-xs font-semibold px-5 py-3 uppercase tracking-wider">Mvt Crédit</th>
              <th className="text-right text-xs font-semibold px-5 py-3 uppercase tracking-wider">Solde Déb.</th>
              <th className="text-right text-xs font-semibold px-5 py-3 uppercase tracking-wider">Solde Cré.</th>
            </tr>
          </thead>
          <tbody>
            {byClasse.map(cl => (
              <>
                <tr key={`class-${cl.numero}`} className="bg-muted/50">
                  <td colSpan={6} className="px-5 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: cl.couleur }}>{cl.numero}</div>
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider">{cl.intitule}</span>
                    </div>
                  </td>
                </tr>
                {cl.comptes.map((c, i) => (
                  <tr key={c.numero} className={cn('border-t border-border/30 hover:bg-muted/20 transition-colors', i % 2 === 0 ? '' : 'bg-muted/5')}>
                    <td className="px-5 py-2.5 font-mono font-bold text-sm text-[#1B4332]">{c.numero}</td>
                    <td className="px-5 py-2.5 text-sm">{c.intitule}</td>
                    <td className="px-5 py-2.5 text-right font-money text-sm text-blue-700 font-semibold">{formatFCFA(c.debit)}</td>
                    <td className="px-5 py-2.5 text-right font-money text-sm text-red-700 font-semibold">{formatFCFA(c.credit)}</td>
                    <td className="px-5 py-2.5 text-right font-money text-sm text-emerald-700 font-semibold">{c.soldeDeb > 0 ? formatFCFA(c.soldeDeb) : '—'}</td>
                    <td className="px-5 py-2.5 text-right font-money text-sm text-amber-700 font-semibold">{c.soldeCre > 0 ? formatFCFA(c.soldeCre) : '—'}</td>
                  </tr>
                ))}
              </>
            ))}
            {/* Totals row */}
            <tr className="border-t-2 border-[#1B4332] bg-[#1B4332]/5">
              <td colSpan={2} className="px-5 py-3 text-sm font-bold uppercase tracking-wider">TOTAUX</td>
              <td className="px-5 py-3 text-right font-mono font-bold text-blue-700">{formatFCFA(totalDebit)}</td>
              <td className="px-5 py-3 text-right font-mono font-bold text-red-700">{formatFCFA(totalCredit)}</td>
              <td className="px-5 py-3 text-right font-mono font-bold text-emerald-700">{formatFCFA(totalSoldeDeb)}</td>
              <td className="px-5 py-3 text-right font-mono font-bold text-amber-700">{formatFCFA(totalSoldeCre)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
