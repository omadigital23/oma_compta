'use client';

import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Wallet } from 'lucide-react';
import { formatFCFA, formatCompact } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number;
  variation: number;
  icon: React.ElementType;
  color: 'green' | 'gold' | 'blue' | 'red';
  format?: 'currency' | 'compact';
}

const colorMap = {
  green: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
  gold: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
};

export function KPICard({ title, value, variation, icon: Icon, color, format = 'currency' }: KPICardProps) {
  const colors = colorMap[color];
  const isPositive = variation >= 0;

  return (
    <div className={cn(
      'relative bg-white rounded-2xl border p-5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 group',
      colors.border
    )}>
      {/* Decorative gradient */}
      <div className={cn('absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.04] -translate-y-8 translate-x-8', colors.bg)} />

      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors.bg)}>
          <Icon className={cn('w-5 h-5', colors.icon)} />
        </div>
        <div className={cn(
          'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
          isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(variation)}%
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground font-money tracking-tight animate-count">
        {format === 'compact' ? formatCompact(value) : formatFCFA(value)}
      </p>
      <p className="text-[11px] text-muted-foreground mt-1">vs mois précédent</p>
    </div>
  );
}

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
      <KPICard
        title="Chiffre d'affaires"
        value={15800000}
        variation={12.5}
        icon={TrendingUp}
        color="green"
        format="compact"
      />
      <KPICard
        title="Dépenses"
        value={8100000}
        variation={-3.2}
        icon={Receipt}
        color="red"
        format="compact"
      />
      <KPICard
        title="Bénéfice net"
        value={7700000}
        variation={24.8}
        icon={DollarSign}
        color="gold"
        format="compact"
      />
      <KPICard
        title="Trésorerie"
        value={22790000}
        variation={8.1}
        icon={Wallet}
        color="blue"
        format="compact"
      />
    </div>
  );
}
