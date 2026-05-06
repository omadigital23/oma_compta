'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_ECRITURES } from '@/lib/mock-data-phase2';
import { PLAN_COMPTABLE_SYSCOHADA } from '@/lib/accounting/plan-comptable';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

// Compile all movements by account number
function buildGrandLivre() {
  const comptes: Record<string, { debit: number; credit: number; lignes: Array<{ date: string; journal: string; libelle: string; debit: number; credit: number }> }> = {};

  MOCK_ECRITURES.forEach(ecriture => {
    ecriture.lignes.forEach(ligne => {
      if (!comptes[ligne.compte]) comptes[ligne.compte] = { debit: 0, credit: 0, lignes: [] };
      comptes[ligne.compte].debit += ligne.debit;
      comptes[ligne.compte].credit += ligne.credit;
      comptes[ligne.compte].lignes.push({ date: ecriture.date, journal: ecriture.journal, libelle: ligne.libelle, debit: ligne.debit, credit: ligne.credit });
    });
  });

  return Object.entries(comptes).map(([numero, data]) => {
    const planCompte = PLAN_COMPTABLE_SYSCOHADA.find(c => c.numero === numero);
    return {
      numero,
      intitule: planCompte?.intitule || 'Compte divers',
      type: planCompte?.type_compte || 'mixte',
      ...data,
      solde: data.debit - data.credit,
    };
  }).sort((a, b) => a.numero.localeCompare(b.numero));
}

export default function GrandLivrePage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const grandLivre = buildGrandLivre();
  const filtered = grandLivre.filter(c =>
    !search || c.numero.includes(search) || c.intitule.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Grand Livre</h1>
        <p className="text-sm text-muted-foreground mt-1">Mouvements par compte — Exercice 2026</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Filtrer par compte ou intitulé..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30" />
      </div>

      <div className="space-y-2 stagger-children">
        {filtered.map(compte => {
          const isOpen = selected === compte.numero;
          const soldeDeb = compte.solde >= 0;

          return (
            <div key={compte.numero} className={cn('bg-white rounded-2xl border overflow-hidden transition-all duration-200',
              isOpen ? 'border-[#1B4332]/30 shadow-md' : 'border-border hover:shadow-sm')}>
              <button className="w-full flex items-center justify-between px-5 py-4" onClick={() => setSelected(isOpen ? null : compte.numero)}>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold font-mono text-[#1B4332] w-16 text-left">{compte.numero}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{compte.intitule}</p>
                    <p className="text-xs text-muted-foreground">{compte.lignes.length} mouvement(s)</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Débit</p>
                    <p className="text-sm font-bold font-money text-blue-700">{formatFCFA(compte.debit)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Crédit</p>
                    <p className="text-sm font-bold font-money text-red-700">{formatFCFA(compte.credit)}</p>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="text-[10px] text-muted-foreground">Solde</p>
                    <p className={cn('text-sm font-bold font-money', soldeDeb ? 'text-emerald-700' : 'text-amber-700')}>
                      {soldeDeb ? 'D' : 'C'} {formatFCFA(Math.abs(compte.solde))}
                    </p>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border/50 animate-fade-in-up">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Date</th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Jnal</th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Libellé</th>
                        <th className="text-right text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Débit</th>
                        <th className="text-right text-[11px] font-semibold text-muted-foreground px-5 py-2 uppercase tracking-wider">Crédit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compte.lignes.map((l, i) => (
                        <tr key={i} className="border-t border-border/30 hover:bg-muted/10">
                          <td className="px-5 py-2.5 text-xs text-muted-foreground">{new Date(l.date).toLocaleDateString('fr-FR')}</td>
                          <td className="px-5 py-2.5 text-xs font-bold text-muted-foreground">{l.journal}</td>
                          <td className="px-5 py-2.5 text-sm">{l.libelle}</td>
                          <td className="px-5 py-2.5 text-right font-money text-sm">
                            {l.debit > 0 ? <span className="font-bold text-blue-700">{formatFCFA(l.debit)}</span> : '—'}
                          </td>
                          <td className="px-5 py-2.5 text-right font-money text-sm">
                            {l.credit > 0 ? <span className="font-bold text-red-700">{formatFCFA(l.credit)}</span> : '—'}
                          </td>
                        </tr>
                      ))}
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
