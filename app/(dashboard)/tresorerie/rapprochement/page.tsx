'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, FileUp, Link2, Search, ShieldAlert, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_RAPPROCHEMENTS } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const statutConfig = {
  rapproche: { label: 'Rapproche', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  a_valider: { label: 'A valider', icon: Sparkles, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  a_traiter: { label: 'A traiter', icon: AlertCircle, className: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export default function RapprochementPage() {
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState<'tous' | 'rapproche' | 'a_valider' | 'a_traiter'>('tous');

  const lignes = MOCK_RAPPROCHEMENTS.filter((ligne) => {
    const q = search.toLowerCase();
    if (filtre !== 'tous' && ligne.statut !== filtre) return false;
    return !q || ligne.libelle.toLowerCase().includes(q) || ligne.ecriture.toLowerCase().includes(q);
  });

  const total = MOCK_RAPPROCHEMENTS.reduce((sum, ligne) => sum + ligne.montant, 0);
  const rapproches = MOCK_RAPPROCHEMENTS.filter((ligne) => ligne.statut === 'rapproche');
  const taux = Math.round((rapproches.length / MOCK_RAPPROCHEMENTS.length) * 100);
  const ecarts = MOCK_RAPPROCHEMENTS.filter((ligne) => ligne.statut !== 'rapproche').reduce((sum, ligne) => sum + ligne.montant, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Rapprochement bancaire</h1>
          <p className="text-sm text-muted-foreground mt-1">Matching automatique par date, montant et reference contre les ecritures comptables.</p>
        </div>
        <Button className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20 sm:w-auto">
          <FileUp className="w-4 h-4" />
          Importer releve
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: 'Transactions', value: String(MOCK_RAPPROCHEMENTS.length), icon: Link2, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Montant analyse', value: formatFCFA(total), icon: Search, color: 'text-foreground', bg: 'bg-gray-100' },
          { label: 'Rapprochement', value: `${taux}%`, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'A traiter', value: formatFCFA(ecarts), icon: ShieldAlert, color: 'text-amber-700', bg: 'bg-amber-50' },
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

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-border bg-white p-1 md:w-auto">
          {[
            ['tous', 'Tous'],
            ['rapproche', 'Rapproches'],
            ['a_valider', 'A valider'],
            ['a_traiter', 'A traiter'],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFiltre(value as typeof filtre)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filtre === value ? 'bg-[#1B4332] text-white shadow-sm' : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-sm md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {lignes.map((ligne) => {
          const config = statutConfig[ligne.statut as keyof typeof statutConfig];
          const Icon = config.icon;
          return (
            <article key={ligne.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{ligne.libelle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(ligne.date)} - {ligne.ecriture}</p>
                </div>
                <span className={cn('shrink-0 rounded-full px-2 py-1 text-[11px] font-bold', ligne.type === 'credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')}>
                  {ligne.type === 'credit' ? 'Credit' : 'Debit'}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-muted/35 p-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Montant</p>
                  <p className={cn('mt-1 font-money text-sm font-bold', ligne.type === 'credit' ? 'text-emerald-700' : 'text-red-700')}>
                    {ligne.type === 'credit' ? '+' : '-'}{formatFCFA(ligne.montant)}
                  </p>
                </div>
                <Badge variant="outline" className={cn('shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', config.className)}>
                  <Icon className="h-2.5 w-2.5" />
                  {config.label}
                </Badge>
              </div>
              {ligne.score > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Score de matching</span>
                    <span className="font-money">{ligne.score}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[#1B4332]" style={{ width: `${ligne.score}%` }} />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="hidden bg-white rounded-2xl border border-border overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Date', 'Releve bancaire', 'Sens', 'Montant', 'Ecriture proposee', 'Score', 'Statut'].map((header) => (
                  <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne) => {
                const config = statutConfig[ligne.statut as keyof typeof statutConfig];
                const Icon = config.icon;
                return (
                  <tr key={ligne.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(ligne.date)}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{ligne.libelle}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('text-[11px] font-bold px-2 py-1 rounded-full', ligne.type === 'credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')}>
                        {ligne.type === 'credit' ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className={cn('px-5 py-3.5 text-sm font-bold font-money', ligne.type === 'credit' ? 'text-emerald-700' : 'text-red-700')}>
                      {ligne.type === 'credit' ? '+' : '-'}{formatFCFA(ligne.montant)}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{ligne.ecriture}</td>
                    <td className="px-5 py-3.5">
                      {ligne.score > 0 ? (
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-[#1B4332]" style={{ width: `${ligne.score}%` }} />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
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
