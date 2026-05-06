'use client';

import { useState } from 'react';
import { Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_EMPLOYES } from '@/lib/mock-data-phase2';
import { formatFCFA } from '@/lib/utils/fcfa';
import { calculerBulletin } from '@/types/rh';
import { cn } from '@/lib/utils';

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function LignePaie({ label, montant, type = 'normal', indent = false }: { label: string; montant: number; type?: 'normal' | 'total' | 'deduction'; indent?: boolean }) {
  return (
    <div className={cn('flex justify-between py-2 text-sm', type === 'total' ? 'border-t border-border font-bold bg-muted/20 px-2 rounded' : 'px-2', indent && 'pl-6')}>
      <span className={type === 'deduction' ? 'text-red-700' : 'text-foreground'}>{label}</span>
      <span className={cn('font-money', type === 'total' ? 'text-foreground' : type === 'deduction' ? 'text-red-700' : 'text-foreground')}>
        {type === 'deduction' ? '-' : ''}{formatFCFA(montant)}
      </span>
    </div>
  );
}

export default function BulletinsPaiePage() {
  const [moisSelect, setMoisSelect] = useState('4');
  const [anneeSelect] = useState('2026');
  const [employeSelect, setEmployeSelect] = useState(MOCK_EMPLOYES[0].id);

  const employe = MOCK_EMPLOYES.find(e => e.id === employeSelect) || MOCK_EMPLOYES[0];
  const bulletin = calculerBulletin(employe);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Bulletins de paie</h1>
          <p className="text-sm text-muted-foreground mt-1">IPRES · CSS · IPR — Conformité Sénégal</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2"><Download className="w-4 h-4" /> Exporter PDF</Button>
          <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl"><Play className="w-4 h-4" /> Lancer la paie</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Selectors */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Paramètres</h3>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Mois</label>
              <Select value={moisSelect} onValueChange={(v) => setMoisSelect(v ?? '1')}>
                <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MOIS.map((m, i) => <SelectItem key={i} value={String(i + 1)}>{m} {anneeSelect}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Employé</label>
              <Select value={employeSelect} onValueChange={(v) => setEmployeSelect(v ?? MOCK_EMPLOYES[0].id)}>
                <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MOCK_EMPLOYES.map(e => <SelectItem key={e.id} value={e.id}>{e.prenom} {e.nom}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tous les employés */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Masse salariale {MOIS[parseInt(moisSelect) - 1]}</p>
            </div>
            <div className="divide-y divide-border/50">
              {MOCK_EMPLOYES.map(e => {
                const b = calculerBulletin(e);
                return (
                  <button key={e.id} onClick={() => setEmployeSelect(e.id)}
                    className={cn('w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/20 transition-colors',
                      e.id === employeSelect && 'bg-[#1B4332]/5 border-l-2 border-[#1B4332]')}>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{e.prenom} {e.nom}</p>
                      <p className="text-xs text-muted-foreground">{e.poste}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold font-money text-emerald-700">{formatFCFA(b.net_a_payer)}</p>
                      <p className="text-[10px] text-muted-foreground">net</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-3 bg-muted/30 border-t border-border flex justify-between text-xs font-bold">
              <span>Total masse salariale</span>
              <span className="font-money text-[#1B4332]">
                {formatFCFA(MOCK_EMPLOYES.reduce((s, e) => s + calculerBulletin(e).cout_total_employeur, 0))}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Bulletin détaillé */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {/* Header bulletin */}
            <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white px-6 py-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Bulletin de paie</p>
                  <h3 className="text-xl font-bold">{employe.prenom} {employe.nom}</h3>
                  <p className="text-sm text-white/70">{employe.poste} · {employe.matricule}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">{MOIS[parseInt(moisSelect) - 1]} {anneeSelect}</p>
                  <p className="text-[11px] text-white/50">
                    {employe.est_cadre ? 'Cadre IPRES' : 'Non cadre'} · {employe.type_contrat.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Lignes bulletin */}
            <div className="p-6 space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">ÉLÉMENTS DU SALAIRE</h4>
              <LignePaie label="Salaire de base" montant={employe.salaire_base} />
              <LignePaie label="Primes et indemnités" montant={0} />
              <LignePaie label="Avantages en nature" montant={0} />
              <div className="my-3 h-px bg-border" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">RETENUES SALARIALES</h4>
              <LignePaie label="IPRES Général (5,6%)" montant={bulletin.ipres_gen_salarie} type="deduction" indent />
              {employe.est_cadre && <LignePaie label="IPRES Cadre (2,4%)" montant={bulletin.ipres_cadre_salarie} type="deduction" indent />}
              <LignePaie label="CSS salarié (3%)" montant={bulletin.css_salarie} type="deduction" indent />
              <LignePaie label="IPR (impôt progressif)" montant={bulletin.ipr} type="deduction" indent />
              <div className="my-3 h-px bg-border" />

              <LignePaie label="NET À PAYER" montant={bulletin.net_a_payer} type="total" />

              <div className="mt-6 p-4 bg-muted/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">COTISATIONS PATRONALES</h4>
                <LignePaie label="IPRES Général patronal (8,4%)" montant={bulletin.ipres_gen_patronal} indent />
                {employe.est_cadre && <LignePaie label="IPRES Cadre patronal (3,6%)" montant={bulletin.ipres_cadre_patronal} indent />}
                <LignePaie label="CSS patronale (7%)" montant={bulletin.css_patronal} indent />
                <div className="h-px bg-border my-2" />
                <LignePaie label="COÛT TOTAL EMPLOYEUR" montant={bulletin.cout_total_employeur} type="total" />
              </div>

              {/* Écriture comptable */}
              <div className="mt-4 p-4 bg-[#1B4332]/5 rounded-xl">
                <p className="text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Écriture comptable (OD Paie)</p>
                <div className="text-xs font-mono space-y-1 text-muted-foreground">
                  <p>D 661 Rémunération du personnel → {formatFCFA(employe.salaire_base)}</p>
                  <p>C 421 Personnel – rémunérations dues → {formatFCFA(bulletin.net_a_payer)}</p>
                  <p>C 431 IPRES → {formatFCFA(bulletin.ipres_gen_salarie + bulletin.ipres_cadre_salarie)}</p>
                  <p>C 432 CSS → {formatFCFA(bulletin.css_salarie)}</p>
                  <p>C 447 IPR → {formatFCFA(bulletin.ipr)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
