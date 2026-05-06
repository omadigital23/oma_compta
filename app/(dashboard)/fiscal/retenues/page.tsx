'use client';

import { useState } from 'react';
import { BadgePercent, CheckCircle2, Clock, Download, FileText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_RETENUES_SOURCE } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const statutConfig = {
  a_declarer: { label: 'A declarer', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  declaree: { label: 'Declaree', icon: FileText, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  payee: { label: 'Payee', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function RetenuesPage() {
  const [search, setSearch] = useState('');

  const retenues = MOCK_RETENUES_SOURCE.filter((retenue) => {
    const q = search.toLowerCase();
    return !q || retenue.tiers.toLowerCase().includes(q) || retenue.nature.toLowerCase().includes(q);
  });

  const totalBase = MOCK_RETENUES_SOURCE.reduce((sum, retenue) => sum + retenue.base, 0);
  const totalRetenu = MOCK_RETENUES_SOURCE.reduce((sum, retenue) => sum + retenue.montant, 0);
  const aDeclarer = MOCK_RETENUES_SOURCE.filter((retenue) => retenue.statut === 'a_declarer').reduce((sum, retenue) => sum + retenue.montant, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Retenues a la source</h1>
          <p className="text-sm text-muted-foreground mt-1">20% prestataires etrangers, 5% CGU local, 10% dividendes et retenues sur interets.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Download className="w-4 h-4" />
          Attestations PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Base imposable', value: formatFCFA(totalBase), icon: FileText, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Total retenu', value: formatFCFA(totalRetenu), icon: BadgePercent, color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'A declarer', value: formatFCFA(aDeclarer), icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', metric.bg)}>
                <metric.icon className={cn('w-4 h-4', metric.color)} />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className={cn('text-xl font-bold font-money', metric.color)}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un tiers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
        />
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Tiers', 'Nature', 'Date', 'Echeance', 'Base', 'Taux', 'Retenue', 'Compte', 'Statut'].map((header) => (
                  <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retenues.map((retenue) => {
                const config = statutConfig[retenue.statut as keyof typeof statutConfig];
                const Icon = config.icon;
                return (
                  <tr key={retenue.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-foreground">{retenue.tiers}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{retenue.nature}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(retenue.date)}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(retenue.echeance)}</td>
                    <td className="px-5 py-3.5 text-sm font-money font-semibold">{formatFCFA(retenue.base)}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded-full">{retenue.taux}%</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold font-money text-red-700">{formatFCFA(retenue.montant)}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{retenue.compte}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5 flex items-center gap-1 w-fit', config.className)}>
                        <Icon className="w-2.5 h-2.5" />
                        {config.label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
