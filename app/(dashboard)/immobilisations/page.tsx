'use client';

import { useState } from 'react';
import { CalendarDays, ChartNoAxesColumnIncreasing, FileSpreadsheet, Plus, Search, Server, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_IMMOBILISATIONS } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

function getIcon(categorie: string) {
  if (categorie.toLowerCase().includes('transport')) return Truck;
  return Server;
}

export default function ImmobilisationsPage() {
  const [search, setSearch] = useState('');

  const immobilisations = MOCK_IMMOBILISATIONS.filter((item) => {
    const q = search.toLowerCase();
    return !q || item.designation.toLowerCase().includes(q) || item.reference.toLowerCase().includes(q) || item.categorie.toLowerCase().includes(q);
  });

  const totalBrut = MOCK_IMMOBILISATIONS.reduce((sum, item) => sum + item.valeur_acquisition, 0);
  const totalAmortissement = MOCK_IMMOBILISATIONS.reduce((sum, item) => sum + item.amortissement_cumule, 0);
  const totalVnc = MOCK_IMMOBILISATIONS.reduce((sum, item) => sum + item.vnc, 0);
  const dotationAnnuelle = MOCK_IMMOBILISATIONS.reduce((sum, item) => sum + item.dotation_annuelle, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Immobilisations</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi SYSCOHADA des comptes 21x-24x et amortissement lineaire.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouvelle fiche
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Valeur brute', value: formatFCFA(totalBrut), icon: FileSpreadsheet, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Amort. cumule', value: formatFCFA(totalAmortissement), icon: ChartNoAxesColumnIncreasing, color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'VNC', value: formatFCFA(totalVnc), icon: Server, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Dotation annuelle', value: formatFCFA(dotationAnnuelle), icon: CalendarDays, color: 'text-amber-700', bg: 'bg-amber-50' },
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

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher une immobilisation..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 stagger-children">
        {immobilisations.map((item) => {
          const Icon = getIcon(item.categorie);
          const tauxAmorti = Math.min(100, Math.round((item.amortissement_cumule / item.valeur_acquisition) * 100));
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1B4332]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1B4332]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.designation}</p>
                    <p className="text-xs text-muted-foreground">{item.reference} - Compte {item.compte}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px]">En service</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Acquisition</p>
                  <p className="font-semibold">{formatDate(item.date_acquisition)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duree</p>
                  <p className="font-semibold">{item.duree_annees} ans</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Brut</p>
                  <p className="font-bold font-money">{formatFCFA(item.valeur_acquisition)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">VNC</p>
                  <p className="font-bold font-money text-emerald-700">{formatFCFA(item.vnc)}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Amortissement cumule</span>
                  <span className="font-semibold">{tauxAmorti}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-[#1B4332]" style={{ width: `${tauxAmorti}%` }} />
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/30 rounded-xl text-xs font-mono text-muted-foreground">
                D 681 Dotations amortissements - C 28x Amortissements : {formatFCFA(item.dotation_annuelle)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
