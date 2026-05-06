'use client';

import { useState } from 'react';
import { CheckCircle2, FileMinus2, FileText, Plus, ReceiptText, RotateCcw, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_AVOIRS } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const statutConfig = {
  brouillon: { label: 'Brouillon', icon: FileText, className: 'bg-gray-100 text-gray-700 border-gray-200' },
  emis: { label: 'Emis', icon: ReceiptText, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  comptabilise: { label: 'Comptabilise', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function AvoirsPage() {
  const [search, setSearch] = useState('');

  const avoirs = MOCK_AVOIRS.filter((avoir) => {
    const q = search.toLowerCase();
    return !q || avoir.numero.toLowerCase().includes(q) || avoir.client.nom.toLowerCase().includes(q) || avoir.facture.numero.toLowerCase().includes(q);
  });

  const totalAvoirs = MOCK_AVOIRS.reduce((sum, avoir) => sum + avoir.montant_ttc, 0);
  const totalTva = MOCK_AVOIRS.reduce((sum, avoir) => sum + avoir.montant_tva, 0);
  const comptabilises = MOCK_AVOIRS.filter((avoir) => avoir.statut === 'comptabilise').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Avoirs</h1>
          <p className="text-sm text-muted-foreground mt-1">Notes de credit liees aux factures et contre-passation comptable automatique.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouvel avoir
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Avoirs TTC', value: formatFCFA(totalAvoirs), icon: FileMinus2, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'TVA a reverser', value: formatFCFA(totalTva), icon: RotateCcw, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Comptabilises', value: `${comptabilises}/${MOCK_AVOIRS.length}`, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
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
          placeholder="Rechercher un avoir..."
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
                {['Avoir', 'Facture origine', 'Client', 'Motif', 'Date', 'Montant TTC', 'Statut', 'Ecriture'].map((header) => (
                  <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {avoirs.map((avoir) => {
                const config = statutConfig[avoir.statut as keyof typeof statutConfig];
                const Icon = config.icon;
                return (
                  <tr key={avoir.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-[#1B4332] font-money">{avoir.numero}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{avoir.facture.numero}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-foreground">{avoir.client.nom}</p>
                      <p className="text-[11px] text-muted-foreground">Compte {avoir.client.compte_comptable}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-[260px] truncate">{avoir.motif}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(avoir.date_avoir)}</td>
                    <td className="px-5 py-3.5 text-sm font-bold font-money text-red-700">-{formatFCFA(avoir.montant_ttc)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5 flex items-center gap-1 w-fit', config.className)}>
                        <Icon className="w-2.5 h-2.5" />
                        {config.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground font-mono">
                      D 706 / D 4432 / C 411
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
