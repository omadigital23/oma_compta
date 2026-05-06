'use client';

import { useState } from 'react';
import { Plus, Search, AlertTriangle, CheckCircle, Clock, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_FACTURES_ACHAT } from '@/lib/mock-data-phase2';
import { formatFCFA } from '@/lib/utils/fcfa';
import { formatDate } from '@/lib/utils/dates';
import { cn } from '@/lib/utils';

const statutConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
  payee: { icon: CheckCircle, label: 'Payée', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  en_attente: { icon: Clock, label: 'En attente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  brouillon: { icon: FileText, label: 'Brouillon', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  en_retard: { icon: AlertTriangle, label: 'En retard', className: 'bg-red-50 text-red-700 border-red-200' },
};

export default function FacturesAchatPage() {
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState('toutes');

  const factures = MOCK_FACTURES_ACHAT.filter(f => {
    if (filtre !== 'toutes' && f.statut !== filtre) return false;
    if (search && !f.numero_interne.toLowerCase().includes(search.toLowerCase()) && !f.fournisseur?.nom.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalAchats = MOCK_FACTURES_ACHAT.reduce((s, f) => s + f.montant_ttc, 0);
  const totalPayé = MOCK_FACTURES_ACHAT.filter(f => f.statut === 'payee').reduce((s, f) => s + f.montant_ttc, 0);
  const totalRetenues = MOCK_FACTURES_ACHAT.reduce((s, f) => s + f.montant_retenue, 0);
  const totalEnAttente = MOCK_FACTURES_ACHAT.filter(f => f.statut === 'en_attente').reduce((s, f) => s + f.montant_net_a_payer, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Factures d&apos;achat</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestion des achats fournisseurs et retenues à la source</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" /> Nouvelle facture achat
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-children">
        {[
          { label: 'Total achats', value: totalAchats, color: 'text-foreground', icon: FileText, bg: 'bg-blue-50', ic: 'text-blue-600' },
          { label: 'Payé', value: totalPayé, color: 'text-emerald-700', icon: CheckCircle, bg: 'bg-emerald-50', ic: 'text-emerald-600' },
          { label: 'À payer', value: totalEnAttente, color: 'text-amber-700', icon: Clock, bg: 'bg-amber-50', ic: 'text-amber-600' },
          { label: 'Retenues à la source', value: totalRetenues, color: 'text-purple-700', icon: AlertTriangle, bg: 'bg-purple-50', ic: 'text-purple-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', k.bg)}>
                <k.icon className={cn('w-3.5 h-3.5', k.ic)} />
              </div>
              <span className="text-xs text-muted-foreground">{k.label}</span>
            </div>
            <p className={cn('text-base font-bold font-money', k.color)}>{formatFCFA(k.value)}</p>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-white border border-border rounded-xl p-1 gap-0.5">
          {[['toutes', 'Toutes'], ['en_attente', 'En attente'], ['payee', 'Payées'], ['brouillon', 'Brouillons']].map(([v, l]) => (
            <button key={v} onClick={() => setFiltre(v)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filtre === v ? 'bg-[#1B4332] text-white' : 'text-muted-foreground hover:bg-muted/50')}>
              {l}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            className="h-9 pl-9 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 w-64 transition-colors" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['N° Interne', 'Fournisseur', 'Réf. Fourn.', 'Date', 'Montant TTC', 'Retenue', 'Net à payer', 'Statut', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factures.map((fa) => {
                const cfg = statutConfig[fa.statut] || statutConfig.brouillon;
                const Icon = cfg.icon;
                return (
                  <tr key={fa.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-bold text-[#1B4332] font-money">{fa.numero_interne}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium">{fa.fournisseur?.nom}</p>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">{fa.description}</p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground font-mono">{fa.reference_fournisseur}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{formatDate(fa.date_facture)}</td>
                    <td className="px-4 py-3.5 text-sm font-bold font-money">{formatFCFA(fa.montant_ttc)}</td>
                    <td className="px-4 py-3.5">
                      {fa.montant_retenue > 0 ? (
                        <span className="text-xs font-bold font-money text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                          -{formatFCFA(fa.montant_retenue)}
                        </span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold font-money text-emerald-700">{formatFCFA(fa.montant_net_a_payer)}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5 flex items-center gap-1 w-fit', cfg.className)}>
                        <Icon className="w-2.5 h-2.5" /> {cfg.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center" title="Voir">
                          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
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
