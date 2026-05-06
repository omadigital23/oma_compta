'use client';

import { useState } from 'react';
import { Landmark, TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_COMPTES_BANQUE } from '@/lib/mock-data';
import { MOCK_MOUVEMENTS_BANCAIRES } from '@/lib/mock-data-phase2';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const banqueConfig: Record<string, { color: string; bg: string }> = {
  cbao: { color: '#1B4332', bg: '#F0F9F4' },
  sgbs: { color: '#003087', bg: '#EEF2FF' },
  bis: { color: '#C9A84C', bg: '#FFFBEB' },
  ecobank: { color: '#009B57', bg: '#F0FDF4' },
  default: { color: '#374151', bg: '#F9FAFB' },
};

export default function BanquesPage() {
  const [selectedCompte, setSelectedCompte] = useState<string | null>(null);
  const comptesBanque = MOCK_COMPTES_BANQUE.filter(c => c.type === 'banque');
  const totalSolde = comptesBanque.reduce((s, c) => s + c.solde_actuel, 0);

  const mouvements = selectedCompte
    ? MOCK_MOUVEMENTS_BANCAIRES.filter(m => m.compte_id === selectedCompte)
    : MOCK_MOUVEMENTS_BANCAIRES;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Comptes bancaires</h1>
          <p className="text-sm text-muted-foreground mt-1">Trésorerie bancaire — Compte SYSCOHADA 52x</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" /> Ajouter un compte
        </Button>
      </div>

      {/* Total banque */}
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Total trésorerie bancaire</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">Comptes 521-529</p>
          </div>
        </div>
        <p className="text-4xl font-bold font-money">{formatFCFA(totalSolde)}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
          <span>{comptesBanque.length} compte(s) actif(s)</span>
        </div>
      </div>

      {/* Compte cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {comptesBanque.map(compte => {
          const cfg = banqueConfig[compte.banque?.toLowerCase() || 'default'] || banqueConfig.default;
          const isSelected = selectedCompte === compte.id;
          const mvts = MOCK_MOUVEMENTS_BANCAIRES.filter(m => m.compte_id === compte.id);
          const entrees = mvts.filter(m => m.type === 'credit').reduce((s, m) => s + m.montant, 0);
          const sorties = mvts.filter(m => m.type === 'debit').reduce((s, m) => s + m.montant, 0);

          return (
            <div key={compte.id}
              onClick={() => setSelectedCompte(isSelected ? null : compte.id)}
              className={cn('bg-white rounded-2xl border p-5 cursor-pointer hover:-translate-y-0.5 transition-all duration-300',
                isSelected ? 'border-[#1B4332] shadow-lg shadow-[#1B4332]/10' : 'border-border hover:shadow-md')}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
                    <Building2 className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{compte.banque}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{compte.numero_compte}</p>
                  </div>
                </div>
                {isSelected && <div className="w-2 h-2 rounded-full bg-[#1B4332]" />}
              </div>

              <p className="text-2xl font-bold font-money text-foreground mb-3">{formatFCFA(compte.solde_actuel)}</p>
              <p className="text-xs text-muted-foreground mb-3">{compte.libelle}</p>

              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="font-money font-semibold">{formatFCFA(entrees)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <ArrowDownRight className="w-3 h-3" />
                  <span className="font-money font-semibold">{formatFCFA(sorties)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mouvements */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            {selectedCompte ? `Mouvements — ${MOCK_COMPTES_BANQUE.find(c => c.id === selectedCompte)?.banque}` : 'Tous les mouvements'}
          </h3>
          <span className="text-xs text-muted-foreground">{mouvements.length} opération(s)</span>
        </div>
        <div className="divide-y divide-border/50">
          {mouvements.map(m => (
            <div key={m.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center',
                  m.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50')}>
                  {m.type === 'credit' ? <TrendingUp className="w-4 h-4 text-emerald-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{m.libelle}</p>
                  <p className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString('fr-FR')} · {m.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-bold font-money', m.type === 'credit' ? 'text-emerald-700' : 'text-red-700')}>
                  {m.type === 'credit' ? '+' : '-'}{formatFCFA(m.montant)}
                </p>
                <p className="text-xs text-muted-foreground font-money">Solde : {formatFCFA(m.solde_apres)}</p>
              </div>
            </div>
          ))}
          {mouvements.length === 0 && (
            <p className="px-5 py-8 text-sm text-muted-foreground text-center">Aucun mouvement pour ce compte</p>
          )}
        </div>
      </div>
    </div>
  );
}
