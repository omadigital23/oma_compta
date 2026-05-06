'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, FileCheck2, Plus, Receipt, Search, WalletCards } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_NOTES_FRAIS } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const statutConfig = {
  brouillon: { label: 'Brouillon', icon: Receipt, className: 'bg-gray-100 text-gray-700 border-gray-200' },
  en_validation: { label: 'En validation', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  approuvee: { label: 'Approuvee', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function NotesFraisPage() {
  const [search, setSearch] = useState('');

  const notes = MOCK_NOTES_FRAIS.filter((note) => {
    const q = search.toLowerCase();
    return !q || note.numero.toLowerCase().includes(q) || `${note.employe.prenom} ${note.employe.nom}`.toLowerCase().includes(q);
  });

  const totalSoumis = MOCK_NOTES_FRAIS.reduce((sum, note) => sum + note.montant_ttc, 0);
  const totalApprouve = MOCK_NOTES_FRAIS.filter((note) => note.statut === 'approuvee').reduce((sum, note) => sum + note.montant_ttc, 0);
  const totalARembourser = MOCK_NOTES_FRAIS.reduce((sum, note) => sum + Math.max(0, note.montant_ttc - note.rembourse), 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Notes de frais</h1>
          <p className="text-sm text-muted-foreground mt-1">Justificatifs, validation interne et remboursement depuis la caisse ou banque.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouvelle note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Soumis TTC', value: formatFCFA(totalSoumis), icon: Receipt, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Approuve', value: formatFCFA(totalApprouve), icon: FileCheck2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'A rembourser', value: formatFCFA(totalARembourser), icon: WalletCards, color: 'text-amber-700', bg: 'bg-amber-50' },
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
          placeholder="Rechercher une note..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Note', 'Employe', 'Periode', 'Soumission', 'Montant TTC', 'Rembourse', 'Statut'].map((header) => (
                    <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => {
                  const config = statutConfig[note.statut as keyof typeof statutConfig];
                  const Icon = config.icon;
                  return (
                    <tr key={note.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-bold text-[#1B4332] font-money">{note.numero}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-foreground">{note.employe.prenom} {note.employe.nom}</p>
                        <p className="text-[11px] text-muted-foreground">{note.employe.poste}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{note.periode}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(note.date_soumission)}</td>
                      <td className="px-5 py-3.5 text-sm font-bold font-money text-foreground">{formatFCFA(note.montant_ttc)}</td>
                      <td className="px-5 py-3.5 text-sm font-bold font-money text-emerald-700">{formatFCFA(note.rembourse)}</td>
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

        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)] mb-4">Analyse par categorie</h3>
          <div className="space-y-3">
            {['Transport', 'Repas mission', 'Internet mobile', 'Representation', 'Taxi'].map((categorie) => {
              const total = MOCK_NOTES_FRAIS.reduce(
                (sum, note) => sum + note.lignes.filter((ligne) => ligne.categorie === categorie).reduce((sub, ligne) => sub + ligne.montant, 0),
                0
              );
              return (
                <div key={categorie} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{categorie}</span>
                  <span className="font-bold font-money text-foreground">{formatFCFA(total)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 p-4 rounded-xl bg-[#1B4332]/5 border border-[#1B4332]/10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">Comptabilisation</p>
            <div className="text-xs font-mono text-muted-foreground space-y-1">
              <p>D 625 Deplacements et missions</p>
              <p>D 4441 TVA recuperable</p>
              <p>C 421 Personnel - remboursements dus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
