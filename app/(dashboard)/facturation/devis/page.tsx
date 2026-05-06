'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, CopyPlus, FileText, MoreHorizontal, Plus, RotateCw, Search, Send, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_DEVIS } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';
import type { StatutDevis } from '@/types/facturation';

const filtres: Array<{ label: string; value: StatutDevis | 'tous' }> = [
  { label: 'Tous', value: 'tous' },
  { label: 'Brouillons', value: 'brouillon' },
  { label: 'Envoyes', value: 'envoye' },
  { label: 'Acceptes', value: 'accepte' },
  { label: 'Expires', value: 'expire' },
  { label: 'Convertis', value: 'converti' },
];

const statutConfig = {
  brouillon: { label: 'Brouillon', icon: FileText, className: 'bg-gray-100 text-gray-700 border-gray-200' },
  envoye: { label: 'Envoye', icon: Send, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  accepte: { label: 'Accepte', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  refuse: { label: 'Refuse', icon: XCircle, className: 'bg-red-50 text-red-700 border-red-200' },
  expire: { label: 'Expire', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  converti: { label: 'Converti', icon: RotateCw, className: 'bg-purple-50 text-purple-700 border-purple-200' },
};

export default function DevisPage() {
  const [filtre, setFiltre] = useState<StatutDevis | 'tous'>('tous');
  const [search, setSearch] = useState('');

  const devis = MOCK_DEVIS.filter((item) => {
    const q = search.toLowerCase();
    if (filtre !== 'tous' && item.statut !== filtre) return false;
    if (q && !item.numero.toLowerCase().includes(q) && !(item.client?.nom || '').toLowerCase().includes(q) && !(item.objet || '').toLowerCase().includes(q)) return false;
    return true;
  });

  const totalPipeline = MOCK_DEVIS
    .filter((item) => ['envoye', 'accepte', 'brouillon'].includes(item.statut))
    .reduce((sum, item) => sum + item.montant_ttc, 0);
  const totalAcceptes = MOCK_DEVIS.filter((item) => item.statut === 'accepte').reduce((sum, item) => sum + item.montant_ttc, 0);
  const aConvertir = MOCK_DEVIS.filter((item) => item.statut === 'accepte' && !item.facture_id).length;
  const tauxConversion = Math.round((MOCK_DEVIS.filter((item) => item.statut === 'accepte' || item.statut === 'converti').length / MOCK_DEVIS.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Devis & proformas</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi commercial, validite 30 jours et conversion en facture.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouveau devis
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-children">
        {[
          { label: 'Pipeline TTC', value: formatFCFA(totalPipeline), icon: FileText, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Acceptes', value: formatFCFA(totalAcceptes), icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'A convertir', value: String(aConvertir), icon: CopyPlus, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Conversion', value: `${tauxConversion}%`, icon: RotateCw, color: 'text-purple-700', bg: 'bg-purple-50' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', metric.bg)}>
                <metric.icon className={cn('w-3.5 h-3.5', metric.color)} />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className={cn('text-lg font-bold font-money', metric.color)}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-white border border-border rounded-xl p-1 gap-0.5">
          {filtres.map((item) => (
            <button
              key={item.value}
              onClick={() => setFiltre(item.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filtre === item.value ? 'bg-[#1B4332] text-white shadow-sm' : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un devis..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Numero', 'Client', 'Objet', 'Date', 'Validite', 'Montant TTC', 'Statut', 'Action'].map((header) => (
                  <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {devis.map((item) => {
                const config = statutConfig[item.statut];
                const Icon = config.icon;
                return (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-bold text-[#1B4332] font-money">{item.numero}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-foreground">{item.client?.nom}</p>
                      <p className="text-[11px] text-muted-foreground">{item.client?.ville || 'Dakar'}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-foreground max-w-[280px] truncate">{item.objet}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(item.date_devis)}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{item.date_validite ? formatDate(item.date_validite) : '-'}</td>
                    <td className="px-5 py-3.5 text-sm font-bold font-money text-foreground">{formatFCFA(item.montant_ttc)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5 flex items-center gap-1 w-fit', config.className)}>
                        <Icon className="w-2.5 h-2.5" />
                        {config.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center" title="Actions">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
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
