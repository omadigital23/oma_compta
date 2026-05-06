'use client';

import { Landmark, Wallet, CreditCard, Smartphone } from 'lucide-react';
import { MOCK_COMPTES_BANQUE } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  banque: Landmark,
  caisse: Wallet,
  wave: CreditCard,
  orange_money: Smartphone,
  free_money: Smartphone,
};

const colorMap: Record<string, { bg: string; text: string; accent: string }> = {
  banque: { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'bg-emerald-500' },
  caisse: { bg: 'bg-blue-50', text: 'text-blue-700', accent: 'bg-blue-500' },
  wave: { bg: 'bg-sky-50', text: 'text-sky-700', accent: 'bg-sky-500' },
  orange_money: { bg: 'bg-orange-50', text: 'text-orange-700', accent: 'bg-orange-500' },
  free_money: { bg: 'bg-purple-50', text: 'text-purple-700', accent: 'bg-purple-500' },
};

export function TresorerieResume() {
  const totalTresorerie = MOCK_COMPTES_BANQUE.reduce((sum, c) => sum + c.solde_actuel, 0);
  const maxSolde = Math.max(...MOCK_COMPTES_BANQUE.map(c => c.solde_actuel));

  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-heading)]">Trésorerie</h3>
        <span className="text-xs text-muted-foreground">Cpt 521 / 571 / 581</span>
      </div>
      <p className="text-2xl font-bold font-money text-foreground mb-5">{formatFCFA(totalTresorerie)}</p>

      <div className="space-y-3">
        {MOCK_COMPTES_BANQUE.map((compte) => {
          const Icon = iconMap[compte.type] || Wallet;
          const colors = colorMap[compte.type] || colorMap.banque;
          const pct = (compte.solde_actuel / maxSolde) * 100;

          return (
            <div key={compte.id} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', colors.bg)}>
                    <Icon className={cn('w-3.5 h-3.5', colors.text)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{compte.libelle}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{compte.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <p className="text-sm font-bold font-money text-foreground">{formatFCFA(compte.solde_actuel)}</p>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-700 ease-out', colors.accent)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
