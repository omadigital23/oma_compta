'use client';

import { useState } from 'react';
import { Plus, Mail, Phone, Building2, CheckCircle, Clock, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_EMPLOYES } from '@/lib/mock-data-phase2';
import { formatFCFA } from '@/lib/utils/fcfa';
import { calculerBulletin } from '@/types/rh';
import { cn } from '@/lib/utils';

const statutConfig = {
  actif: { label: 'Actif', icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  conge: { label: 'En congé', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  suspendu: { label: 'Suspendu', icon: UserX, className: 'bg-red-50 text-red-700 border-red-200' },
  licencie: { label: 'Licencié', icon: UserX, className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

const contratLabel: Record<string, string> = { cdi: 'CDI', cdd: 'CDD', stage: 'Stage', consultant: 'Consultant', apprentissage: 'Apprentissage' };

export default function EmployesPage() {
  const [search, setSearch] = useState('');
  const employes = MOCK_EMPLOYES.filter(e =>
    !search || e.nom.toLowerCase().includes(search.toLowerCase()) || e.prenom.toLowerCase().includes(search.toLowerCase()) || e.poste.toLowerCase().includes(search.toLowerCase())
  );

  const masseSalariale = MOCK_EMPLOYES.reduce((s, e) => s + calculerBulletin(e).cout_total_employeur, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Employés</h1>
          <p className="text-sm text-muted-foreground mt-1">{MOCK_EMPLOYES.length} employés · Masse salariale : <span className="font-bold font-money">{formatFCFA(masseSalariale)}</span>/mois</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" /> Nouvel employé
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Actifs</p>
          <p className="text-2xl font-bold text-foreground">{MOCK_EMPLOYES.filter(e => e.statut === 'actif').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">CDI</p>
          <p className="text-2xl font-bold text-foreground">{MOCK_EMPLOYES.filter(e => e.type_contrat === 'cdi').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Masse salariale brut</p>
          <p className="text-base font-bold font-money text-[#1B4332]">{formatFCFA(MOCK_EMPLOYES.reduce((s, e) => s + e.salaire_base, 0))}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Coût total employeur</p>
          <p className="text-base font-bold font-money text-amber-700">{formatFCFA(masseSalariale)}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input type="text" placeholder="Rechercher un employé..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-4 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30" />
      </div>

      {/* Employee cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
        {employes.map(emp => {
          const cfg = statutConfig[emp.statut];
          const Icon = cfg.icon;
          const bulletin = calculerBulletin(emp);

          return (
            <div key={emp.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1B4332]/10 to-[#C9A84C]/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#1B4332]">
                      {emp.prenom[0]}{emp.nom[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-[#1B4332] transition-colors">
                      {emp.prenom} {emp.nom}
                    </h3>
                    <p className="text-xs text-muted-foreground">{emp.poste}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn('text-[10px] font-semibold border rounded-full flex items-center gap-1', cfg.className)}>
                  <Icon className="w-2.5 h-2.5" /> {cfg.label}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                {emp.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /><span className="truncate">{emp.email}</span></div>}
                {emp.telephone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>{emp.telephone}</span></div>}
                {emp.departement && <div className="flex items-center gap-2"><Building2 className="w-3 h-3" /><span>{emp.departement}</span></div>}
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{contratLabel[emp.type_contrat]}</span>
                  {emp.est_cadre && <span className="text-[10px] bg-[#C9A84C]/10 text-[#8B6914] px-2 py-0.5 rounded-full font-semibold">Cadre</span>}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-muted-foreground">Salaire brut</p>
                    <p className="font-bold font-money text-foreground">{formatFCFA(emp.salaire_base)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Net à payer</p>
                    <p className="font-bold font-money text-emerald-700">{formatFCFA(bulletin.net_a_payer)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Coût empl.</p>
                    <p className="font-bold font-money text-amber-700">{formatFCFA(bulletin.cout_total_employeur)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
