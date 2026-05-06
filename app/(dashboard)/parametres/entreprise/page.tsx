'use client';

import { Building2, FileText, Save, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MOCK_ENTREPRISE } from '@/lib/mock-data';

export default function ParametresEntreprisePage() {
  const ent = MOCK_ENTREPRISE;

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Paramètres entreprise</h1>
        <p className="text-sm text-muted-foreground mt-1">Informations légales, fiscal, et apparence de vos documents</p>
      </div>

      {/* Identité */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Identité de l&apos;entreprise</h2>
        </div>

        {/* Logo upload */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
            <span className="text-[10px] text-muted-foreground">Logo</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{ent.nom}</p>
            <p className="text-xs text-muted-foreground">PNG, JPG — max 2 Mo</p>
            <button className="text-xs text-primary hover:underline mt-1">Changer le logo</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1.5">Raison sociale</Label>
            <Input defaultValue={ent.nom} className="rounded-xl h-10" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Forme juridique</Label>
            <Select defaultValue={ent.forme_juridique || 'sarl'}>
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sarl">SARL</SelectItem>
                <SelectItem value="sa">SA</SelectItem>
                <SelectItem value="sas">SAS</SelectItem>
                <SelectItem value="ei">Entreprise Individuelle</SelectItem>
                <SelectItem value="gmbh">GIE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5">NINEA</Label>
            <Input defaultValue={ent.ninea || ''} className="rounded-xl h-10 font-money" placeholder="SN-DKR-2024-B-12345" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">RCCM</Label>
            <Input defaultValue={ent.rccm || ''} className="rounded-xl h-10 font-money" placeholder="SN-DKR-2024-B-7890" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Adresse</Label>
            <Input defaultValue={ent.adresse || ''} className="rounded-xl h-10" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Ville</Label>
            <Input defaultValue={ent.ville || 'Dakar'} className="rounded-xl h-10" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Téléphone</Label>
            <Input defaultValue={ent.telephone || ''} className="rounded-xl h-10" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Email</Label>
            <Input type="email" defaultValue={ent.email || ''} className="rounded-xl h-10" />
          </div>
        </div>
      </div>

      {/* Fiscal */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Paramètres fiscaux</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1.5">Régime TVA</Label>
            <Select defaultValue={ent.regime_tva}>
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mensuel">Mensuel</SelectItem>
                <SelectItem value="trimestriel">Trimestriel</SelectItem>
                <SelectItem value="exonere">Exonéré</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Régime IS</Label>
            <Select defaultValue={ent.regime_is}>
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Régime du bénéfice réel normal</SelectItem>
                <SelectItem value="simplifie">Régime simplifié</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Début d&apos;exercice comptable</Label>
            <Select defaultValue="1">
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1er janvier</SelectItem>
                <SelectItem value="4">1er avril</SelectItem>
                <SelectItem value="7">1er juillet</SelectItem>
                <SelectItem value="10">1er octobre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Devise</Label>
            <Select defaultValue="XOF">
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="XOF">XOF — Franc CFA BCEAO</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="USD">USD — Dollar US</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl">Annuler</Button>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl gap-2 shadow-lg shadow-[#1B4332]/20">
          <Save className="w-4 h-4" /> Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
