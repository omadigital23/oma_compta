'use client';

import { useState } from 'react';
import { AlertCircle, Bell, CalendarDays, CheckCircle2, Clock, FileText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_DECLARATIONS_FISCALES } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const statutConfig = {
  en_cours: { label: 'En cours', icon: Clock, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  a_deposer: { label: 'A deposer', icon: AlertCircle, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  a_venir: { label: 'A venir', icon: CalendarDays, className: 'bg-gray-100 text-gray-700 border-gray-200' },
  deposee: { label: 'Deposee', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function DeclarationsPage() {
  const [search, setSearch] = useState('');

  const declarations = MOCK_DECLARATIONS_FISCALES.filter((declaration) => {
    const q = search.toLowerCase();
    return !q || declaration.type.toLowerCase().includes(q) || declaration.periode.toLowerCase().includes(q) || declaration.organisme.toLowerCase().includes(q);
  });

  const montantTotal = MOCK_DECLARATIONS_FISCALES.reduce((sum, declaration) => sum + declaration.montant, 0);
  const prochaines = MOCK_DECLARATIONS_FISCALES.filter((declaration) => declaration.statut !== 'deposee').length;
  const urgentes = MOCK_DECLARATIONS_FISCALES.filter((declaration) => ['en_cours', 'a_deposer'].includes(declaration.statut)).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Calendrier fiscal</h1>
          <p className="text-sm text-muted-foreground mt-1">TVA, IS, retenues, IPRES et CSS avec alertes J-7.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Bell className="w-4 h-4" />
          Configurer alertes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Montant programme', value: formatFCFA(montantTotal), icon: FileText, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Echeances ouvertes', value: String(prochaines), icon: CalendarDays, color: 'text-[#1B4332]', bg: 'bg-[#1B4332]/10' },
          { label: 'Urgentes', value: String(urgentes), icon: AlertCircle, color: 'text-amber-700', bg: 'bg-amber-50' },
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
          placeholder="Rechercher une declaration..."
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
                {['Type', 'Periode', 'Organisme', 'Echeance', 'Montant', 'Alerte', 'Statut'].map((header) => (
                  <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {declarations.map((declaration) => {
                const config = statutConfig[declaration.statut as keyof typeof statutConfig];
                const Icon = config.icon;
                const date = new Date(declaration.echeance);
                const alertDate = new Date(date);
                alertDate.setDate(alertDate.getDate() - 7);
                return (
                  <tr key={declaration.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-[#1B4332]">{declaration.type}</td>
                    <td className="px-5 py-3.5 text-sm text-foreground">{declaration.periode}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{declaration.organisme}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(declaration.echeance)}</td>
                    <td className="px-5 py-3.5 text-sm font-bold font-money text-foreground">{formatFCFA(declaration.montant)}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(alertDate)}</td>
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
