'use client';

import { useState } from 'react';
import { Plus, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_ECRITURES } from '@/lib/mock-data-phase2';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const journauxConfig: Record<string, { label: string; color: string; bg: string }> = {
  VTE: { label: 'Ventes', color: 'text-blue-700', bg: 'bg-blue-50' },
  ACH: { label: 'Achats', color: 'text-red-700', bg: 'bg-red-50' },
  BNQ: { label: 'Banque', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  CAI: { label: 'Caisse', color: 'text-amber-700', bg: 'bg-amber-50' },
  OD: { label: 'Opér. diverses', color: 'text-purple-700', bg: 'bg-purple-50' },
  PAI: { label: 'Paie', color: 'text-pink-700', bg: 'bg-pink-50' },
};

export default function JournalPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filtre, setFiltre] = useState('tous');

  const ecritures = filtre === 'tous' ? MOCK_ECRITURES : MOCK_ECRITURES.filter(e => e.journal === filtre);

  const totalDebit = MOCK_ECRITURES.flatMap(e => e.lignes).reduce((s, l) => s + l.debit, 0);
  const totalCredit = MOCK_ECRITURES.flatMap(e => e.lignes).reduce((s, l) => s + l.credit, 0);
  const equilibre = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Journal général</h1>
          <p className="text-sm text-muted-foreground mt-1">Saisie des écritures — Partie double SYSCOHADA</p>
        </div>
        <div className="flex items-center gap-2">
          {equilibre ? (
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> Journal équilibré
            </div>
          ) : (
            <div className="text-red-700 bg-red-50 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-full">
              ⚠ Déséquilibre : {formatFCFA(Math.abs(totalDebit - totalCredit))}
            </div>
          )}
          <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Saisir une écriture
          </Button>
        </div>
      </div>

      {/* Totaux équilibre */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Débit</p>
          <p className="text-xl font-bold font-money text-blue-700">{formatFCFA(totalDebit)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Crédit</p>
          <p className="text-xl font-bold font-money text-red-700">{formatFCFA(totalCredit)}</p>
        </div>
        <div className={cn('rounded-2xl border p-5 text-center', equilibre ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Écart</p>
          <p className={cn('text-xl font-bold font-money', equilibre ? 'text-emerald-700' : 'text-red-700')}>
            {formatFCFA(Math.abs(totalDebit - totalCredit))}
          </p>
        </div>
      </div>

      {/* Filtre journaux */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => setFiltre('tous')}
          className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
            filtre === 'tous' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white text-muted-foreground border-border hover:bg-muted/50')}>
          Tous
        </button>
        {Object.entries(journauxConfig).map(([code, cfg]) => (
          <button key={code} onClick={() => setFiltre(code)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
              filtre === code ? `${cfg.bg} ${cfg.color} border-current` : 'bg-white text-muted-foreground border-border hover:bg-muted/50')}>
            {code} — {cfg.label}
          </button>
        ))}
      </div>

      {/* Liste écritures */}
      <div className="space-y-2">
        {ecritures.map(ecriture => {
          const jcfg = journauxConfig[ecriture.journal] || { label: ecriture.journal, color: 'text-gray-700', bg: 'bg-gray-50' };
          const isOpen = selected === ecriture.id;
          const totDeb = ecriture.lignes.reduce((s, l) => s + l.debit, 0);
          const totCre = ecriture.lignes.reduce((s, l) => s + l.credit, 0);
          const ok = Math.abs(totDeb - totCre) < 0.01;

          return (
            <div key={ecriture.id} className={cn('bg-white rounded-2xl border transition-all duration-200 overflow-hidden',
              isOpen ? 'border-[#1B4332]/30 shadow-md' : 'border-border hover:shadow-sm')}>
              <button className="w-full flex items-center justify-between px-5 py-3.5 text-left" onClick={() => setSelected(isOpen ? null : ecriture.id)}>
                <div className="flex items-center gap-4">
                  <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-lg', jcfg.bg, jcfg.color)}>{ecriture.journal}</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{ecriture.numero}</p>
                    <p className="text-xs text-muted-foreground">{ecriture.libelle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Date</p>
                    <p className="text-xs font-semibold">{new Date(ecriture.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Montant</p>
                    <p className="text-sm font-bold font-money text-foreground">{formatFCFA(totDeb)}</p>
                  </div>
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
                    ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
                    {ok ? '✓' : '!'}
                  </div>
                  {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border/50 animate-fade-in-up">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Compte</th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Libellé</th>
                        <th className="text-right text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Débit</th>
                        <th className="text-right text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Crédit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ecriture.lignes.map((l, i) => (
                        <tr key={i} className="border-t border-border/30 hover:bg-muted/10">
                          <td className="px-5 py-2.5 font-mono font-bold text-[#1B4332] text-sm">{l.compte}</td>
                          <td className="px-5 py-2.5 text-muted-foreground text-sm">{l.libelle}</td>
                          <td className="px-5 py-2.5 text-right font-money font-semibold">
                            {l.debit > 0 ? <span className="text-blue-700">{formatFCFA(l.debit)}</span> : <span className="text-muted-foreground/30">—</span>}
                          </td>
                          <td className="px-5 py-2.5 text-right font-money font-semibold">
                            {l.credit > 0 ? <span className="text-red-700">{formatFCFA(l.credit)}</span> : <span className="text-muted-foreground/30">—</span>}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t border-border bg-muted/30">
                        <td colSpan={2} className="px-5 py-2 text-xs font-bold uppercase tracking-wider">TOTAUX</td>
                        <td className="px-5 py-2 text-right font-mono font-bold text-blue-700">{formatFCFA(totDeb)}</td>
                        <td className="px-5 py-2 text-right font-mono font-bold text-red-700">{formatFCFA(totCre)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
