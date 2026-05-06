'use client';

import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Banknote, Plus, ReceiptText, Search, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_COMPTES_CAISSE, MOCK_MOUVEMENTS_CAISSE } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

export default function CaissesPage() {
  const [search, setSearch] = useState('');

  const mouvements = MOCK_MOUVEMENTS_CAISSE.filter((mouvement) => {
    const q = search.toLowerCase();
    return !q || mouvement.libelle.toLowerCase().includes(q) || mouvement.piece.toLowerCase().includes(q);
  });

  const totalSolde = MOCK_COMPTES_CAISSE.reduce((sum, compte) => sum + compte.solde_actuel, 0);
  const totalEntrees = MOCK_MOUVEMENTS_CAISSE.filter((mouvement) => mouvement.type === 'entree').reduce((sum, mouvement) => sum + mouvement.montant, 0);
  const totalSorties = MOCK_MOUVEMENTS_CAISSE.filter((mouvement) => mouvement.type === 'sortie').reduce((sum, mouvement) => sum + mouvement.montant, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Caisses physiques</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi des especes, pieces de caisse et compte SYSCOHADA 571.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Mouvement caisse
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-white/70">Solde caisse disponible</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Compte 571 - Caisse principale</p>
            </div>
          </div>
          <p className="text-4xl font-bold font-money">{formatFCFA(totalSolde)}</p>
          <div className="flex items-center gap-4 mt-4 text-xs text-white/70">
            <span>Entrees : {formatFCFA(totalEntrees)}</span>
            <span>Sorties : {formatFCFA(totalSorties)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Controle quotidien</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernier arrete</span>
              <span className="font-semibold">05/05/2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ecart releve</span>
              <span className="font-bold font-money text-emerald-700">{formatFCFA(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pieces a classer</span>
              <span className="font-semibold text-amber-700">2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un mouvement..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Journal de caisse</h3>
          <span className="text-xs text-muted-foreground">{mouvements.length} operation(s)</span>
        </div>
        <div className="divide-y divide-border/50">
          {mouvements.map((mouvement) => (
            <div key={mouvement.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', mouvement.type === 'entree' ? 'bg-emerald-50' : 'bg-red-50')}>
                  {mouvement.type === 'entree' ? <ArrowUpRight className="w-4 h-4 text-emerald-600" /> : <ArrowDownRight className="w-4 h-4 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{mouvement.libelle}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ReceiptText className="w-3 h-3" />
                    {formatDate(mouvement.date)} - {mouvement.piece}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-bold font-money', mouvement.type === 'entree' ? 'text-emerald-700' : 'text-red-700')}>
                  {mouvement.type === 'entree' ? '+' : '-'}{formatFCFA(mouvement.montant)}
                </p>
                <p className="text-xs text-muted-foreground font-money">Solde : {formatFCFA(mouvement.solde_apres)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Banknote className="w-4 h-4 text-[#1B4332]" />
          <h3 className="text-sm font-bold text-foreground">Ecriture type</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-muted-foreground">
          <p>D 571 Caisse - entree especes</p>
          <p>C 521 Banque - retrait caisse</p>
          <p>D 625/606 - depenses caisse justifiees</p>
        </div>
      </div>
    </div>
  );
}
