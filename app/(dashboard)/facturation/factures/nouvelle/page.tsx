'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Send, Eye, Calculator } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_CLIENTS } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { calculerLigneTVA } from '@/lib/accounting/tva';

interface LigneForm {
  id: number;
  description: string;
  quantite: number;
  unite: string;
  prix_unitaire_ht: number;
  taux_tva: number;
  taux_remise: number;
}

const ligneVide = (): LigneForm => ({
  id: Date.now(),
  description: '',
  quantite: 1,
  unite: 'unité',
  prix_unitaire_ht: 0,
  taux_tva: 18,
  taux_remise: 0,
});

export default function NouvelleFacturePage() {
  const [lignes, setLignes] = useState<LigneForm[]>([ligneVide()]);
  const [clientId, setClientId] = useState('');
  const [remiseGlobale, setRemiseGlobale] = useState(0);

  const ajouterLigne = () => setLignes([...lignes, ligneVide()]);
  const supprimerLigne = (id: number) => setLignes(lignes.filter(l => l.id !== id));
  const updateLigne = (id: number, field: keyof LigneForm, value: string | number) => {
    setLignes(lignes.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const calculs = lignes.map(l => calculerLigneTVA(l.quantite, l.prix_unitaire_ht, l.taux_remise, l.taux_tva));
  const totalHT = calculs.reduce((s, c) => s + c.montantHT, 0);
  const remiseAmount = Math.round(totalHT * remiseGlobale / 100);
  const totalHTNet = totalHT - remiseAmount;
  const totalTVANet = Math.round(totalHTNet * 18 / 100);
  const totalTTC = totalHTNet + totalTVANet;

  return (
    <div className="space-y-6 animate-fade-in-up max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/facturation/factures">
            <button className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Nouvelle facture</h1>
            <p className="text-sm text-muted-foreground">FCT-2026-0006 • Brouillon</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 rounded-xl"><Eye className="w-4 h-4" /> Aperçu PDF</Button>
          <Button variant="outline" className="gap-2 rounded-xl"><Save className="w-4 h-4" /> Enregistrer</Button>
          <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
            <Send className="w-4 h-4" /> Valider & Envoyer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client selection */}
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Informations générales</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1.5">Client</Label>
                <Select value={clientId} onValueChange={(v) => setClientId(v ?? '')}>
                  <SelectTrigger className="rounded-xl h-10">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CLIENTS.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.nom} {c.prenom || ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Date de facture</Label>
                <Input type="date" defaultValue="2026-05-05" className="rounded-xl h-10" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Date d&apos;échéance</Label>
                <Input type="date" defaultValue="2026-06-04" className="rounded-xl h-10" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Objet</Label>
                <Input placeholder="Prestation de services..." className="rounded-xl h-10" />
              </div>
            </div>
          </div>

          {/* Invoice lines */}
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Lignes de facture</h2>
              <Button variant="outline" size="sm" onClick={ajouterLigne} className="gap-1.5 rounded-lg text-xs">
                <Plus className="w-3.5 h-3.5" /> Ajouter une ligne
              </Button>
            </div>

            <div className="space-y-3">
              {lignes.map((ligne, index) => {
                const calc = calculs[index];
                return (
                  <div key={ligne.id} className="grid grid-cols-12 gap-2 items-end p-3 rounded-xl bg-muted/30 border border-border/50">
                    <div className="col-span-4">
                      <Label className="text-[10px] text-muted-foreground">Description</Label>
                      <Input
                        placeholder="Description du service..."
                        value={ligne.description}
                        onChange={e => updateLigne(ligne.id, 'description', e.target.value)}
                        className="rounded-lg h-9 text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-[10px] text-muted-foreground">Qté</Label>
                      <Input
                        type="number" min="1" value={ligne.quantite}
                        onChange={e => updateLigne(ligne.id, 'quantite', parseFloat(e.target.value) || 0)}
                        className="rounded-lg h-9 text-sm text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-[10px] text-muted-foreground">Prix HT (FCFA)</Label>
                      <Input
                        type="number" min="0" value={ligne.prix_unitaire_ht}
                        onChange={e => updateLigne(ligne.id, 'prix_unitaire_ht', parseFloat(e.target.value) || 0)}
                        className="rounded-lg h-9 text-sm font-money"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-[10px] text-muted-foreground">TVA %</Label>
                      <Select value={String(ligne.taux_tva)} onValueChange={v => updateLigne(ligne.id, 'taux_tva', parseFloat(v ?? '18'))}>
                        <SelectTrigger className="rounded-lg h-9 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18">18%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="0">0%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-[10px] text-muted-foreground">Total TTC</Label>
                      <div className="h-9 flex items-center px-3 rounded-lg bg-muted text-sm font-money font-bold">
                        {formatFCFA(calc?.montantTTC || 0)}
                      </div>
                    </div>
                    <div className="col-span-2 flex items-end justify-end gap-1">
                      {lignes.length > 1 && (
                        <button
                          onClick={() => supprimerLigne(ligne.id)}
                          className="w-9 h-9 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
            <Label className="text-sm font-semibold uppercase tracking-wider">Notes & conditions</Label>
            <Textarea placeholder="Conditions de règlement, notes..." className="rounded-xl resize-none" rows={3} />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4 sticky top-24">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-muted-foreground" /> Récapitulatif
            </h2>

            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total HT</span>
                <span className="font-money font-semibold">{formatFCFA(totalHT)}</span>
              </div>
              {remiseGlobale > 0 && (
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Remise ({remiseGlobale}%)</span>
                  <span className="font-money">-{formatFCFA(remiseAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">HT Net</span>
                <span className="font-money font-semibold">{formatFCFA(totalHTNet)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">TVA (18%)</span>
                <span className="font-money">{formatFCFA(totalTVANet)}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-base font-bold">Total TTC</span>
                <span className="text-xl font-bold font-money text-[#1B4332]">{formatFCFA(totalTTC)}</span>
              </div>
            </div>

            {/* Global discount */}
            <div className="pt-3 border-t border-border">
              <Label className="text-xs text-muted-foreground">Remise globale (%)</Label>
              <Input
                type="number" min="0" max="100" value={remiseGlobale}
                onChange={e => setRemiseGlobale(parseFloat(e.target.value) || 0)}
                className="rounded-xl h-9 mt-1.5 text-sm"
              />
            </div>

            {/* Accounting info */}
            <div className="pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold">Écriture comptable :</span></p>
              <p className="font-money">D 411xxx → {formatFCFA(totalTTC)}</p>
              <p className="font-money">C 706 → {formatFCFA(totalHTNet)}</p>
              <p className="font-money">C 4432 → {formatFCFA(totalTVANet)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
