'use client';

import { Smartphone, ArrowUpRight, Wallet } from 'lucide-react';
import { MOCK_COMPTES_BANQUE } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';

const mobileMoneyProviders = MOCK_COMPTES_BANQUE.filter(c => ['wave', 'orange_money', 'free_money'].includes(c.type));

const providerConfig: Record<string, { color: string; bg: string; label: string }> = {
  wave: { color: '#0066CC', bg: '#EFF6FF', label: 'Wave Business' },
  orange_money: { color: '#FF6900', bg: '#FFF7ED', label: 'Orange Money Pro' },
  free_money: { color: '#E11D48', bg: '#FFF1F2', label: 'Free Money' },
};

export default function MobileMoneyPage() {
  const total = mobileMoneyProviders.reduce((s, c) => s + c.solde_actuel, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Mobile Money</h1>
        <p className="text-sm text-muted-foreground mt-1">Wave, Orange Money, Free Money — Compte SYSCOHADA 581</p>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Total Mobile Money</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">Compte 581</p>
          </div>
        </div>
        <p className="text-3xl font-bold font-money">{formatFCFA(total)}</p>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        {mobileMoneyProviders.map((compte) => {
          const config = providerConfig[compte.type] || { color: '#374151', bg: '#F9FAFB', label: compte.libelle };
          return (
            <div key={compte.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: config.bg }}>
                    <Wallet className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{config.label}</p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{compte.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-semibold">
                  <ArrowUpRight className="w-3 h-3" /> +12%
                </div>
              </div>
              <p className="text-2xl font-bold font-money text-foreground mb-1">{formatFCFA(compte.solde_actuel)}</p>
              <p className="text-xs text-muted-foreground">Solde disponible</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="h-8 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors">
                  Entrée
                </button>
                <button className="h-8 rounded-lg text-xs font-medium text-white transition-colors" style={{ backgroundColor: config.color }}>
                  Sortie
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
