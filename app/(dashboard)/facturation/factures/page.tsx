'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, FileText, Eye, Send, Receipt, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_FACTURES } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { formatDate } from '@/lib/utils/dates';
import { StatutBadgeFacture } from '@/components/facturation/StatutBadge';
import { cn } from '@/lib/utils';
import type { StatutFacture } from '@/types/facturation';

const filtres: { label: string; value: StatutFacture | 'toutes' }[] = [
  { label: 'Toutes', value: 'toutes' },
  { label: 'Brouillons', value: 'brouillon' },
  { label: 'Envoyées', value: 'envoyee' },
  { label: 'En attente', value: 'partiellement_payee' },
  { label: 'Payées', value: 'payee' },
  { label: 'Annulées', value: 'annulee' },
];

export default function FacturesPage() {
  const [filtreActif, setFiltreActif] = useState<string>('toutes');
  const [search, setSearch] = useState('');

  const factures = MOCK_FACTURES.filter(f => {
    if (filtreActif !== 'toutes' && f.statut !== filtreActif) return false;
    if (search && !f.numero.toLowerCase().includes(search.toLowerCase()) && !f.client?.nom.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalFacture = MOCK_FACTURES.reduce((s, f) => s + f.montant_ttc, 0);
  const totalPaye = MOCK_FACTURES.reduce((s, f) => s + f.montant_paye, 0);
  const totalEnAttente = MOCK_FACTURES.filter(f => f.statut === 'envoyee' || f.statut === 'partiellement_payee').reduce((s, f) => s + f.montant_restant, 0);
  const totalRetard = MOCK_FACTURES.filter(f => f.statut === 'envoyee' && f.date_echeance && new Date(f.date_echeance) < new Date()).reduce((s, f) => s + f.montant_restant, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Factures</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestion de la facturation — SYSCOHADA</p>
        </div>
        <Link href="/facturation/factures/nouvelle" className="w-full sm:w-auto">
          <Button className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20 sm:w-auto">
            <Plus className="w-4 h-4" />
            Nouvelle facture
          </Button>
        </Link>
      </div>

      {/* KPI mini cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 stagger-children">
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><Receipt className="w-3.5 h-3.5 text-blue-600" /></div>
            <span className="text-xs text-muted-foreground">Total facturé</span>
          </div>
          <p className="text-lg font-bold font-money">{formatFCFA(totalFacture)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /></div>
            <span className="text-xs text-muted-foreground">Encaissé</span>
          </div>
          <p className="text-lg font-bold font-money text-emerald-700">{formatFCFA(totalPaye)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center"><Clock className="w-3.5 h-3.5 text-amber-600" /></div>
            <span className="text-xs text-muted-foreground">En attente</span>
          </div>
          <p className="text-lg font-bold font-money text-amber-700">{formatFCFA(totalEnAttente)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center"><AlertCircle className="w-3.5 h-3.5 text-red-600" /></div>
            <span className="text-xs text-muted-foreground">En retard</span>
          </div>
          <p className="text-lg font-bold font-money text-red-700">{formatFCFA(totalRetard)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-border bg-white p-1 md:w-auto">
          {filtres.map(f => (
            <button
              key={f.value}
              onClick={() => setFiltreActif(f.value)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                filtreActif === f.value
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-sm md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      {/* Mobile invoice cards */}
      <div className="space-y-3 md:hidden">
        {factures.map((facture) => (
          <article key={facture.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-money text-sm font-bold text-[#1B4332]">{facture.numero}</p>
                <p className="mt-1 truncate text-sm font-semibold text-foreground">{facture.client?.nom}</p>
                <p className="text-xs text-muted-foreground">{facture.client?.ville || 'Dakar'} - {formatDate(facture.date_facture)}</p>
              </div>
              <StatutBadgeFacture statut={facture.statut} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/35 p-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Montant TTC</p>
                <p className="mt-1 font-money text-sm font-bold text-foreground">{formatFCFA(facture.montant_ttc)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Reste dû</p>
                <p className={cn(
                  'mt-1 font-money text-sm font-bold',
                  facture.montant_restant > 0 ? 'text-amber-600' : 'text-emerald-600'
                )}>
                  {formatFCFA(facture.montant_restant)}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Échéance</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {facture.date_echeance ? formatDate(facture.date_echeance) : '-'}
                </p>
              </div>
              <div className="flex items-end justify-end gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white" aria-label="Voir la facture">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white" aria-label="Exporter la facture en PDF">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white" aria-label="Envoyer la facture">
                  <Send className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Invoices table */}
      <div className="hidden bg-white rounded-2xl border border-border overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">N° Facture</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Client</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Échéance</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Montant TTC</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Reste dû</th>
                <th className="text-center text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Statut</th>
                <th className="text-center text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture, i) => (
                <tr
                  key={facture.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors group cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-[#1B4332] font-money">{facture.numero}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">{facture.client?.nom}</p>
                    <p className="text-[11px] text-muted-foreground">{facture.client?.ville || 'Dakar'}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(facture.date_facture)}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{facture.date_echeance ? formatDate(facture.date_echeance) : '—'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-bold font-money text-foreground">{formatFCFA(facture.montant_ttc)}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={cn(
                      'text-sm font-bold font-money',
                      facture.montant_restant > 0 ? 'text-amber-600' : 'text-emerald-600'
                    )}>
                      {formatFCFA(facture.montant_restant)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <StatutBadgeFacture statut={facture.statut} />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center" title="Voir">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center" title="PDF">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center" title="Envoyer">
                        <Send className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
