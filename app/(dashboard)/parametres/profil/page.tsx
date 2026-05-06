'use client';

import { KeyRound, Mail, Phone, Save, ShieldCheck, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_ENTREPRISE } from '@/lib/mock-data';

export default function ProfilPage() {
  return (
    <div className="max-w-4xl space-y-6 animate-fade-in-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Mon profil</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Informations personnelles, accès et préférences de votre compte.
          </p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <ShieldCheck className="mr-1 h-3.5 w-3.5" />
          Administrateur
        </Badge>
      </div>

      <section className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-5 border-b border-border pb-5">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-lg font-bold text-white">
              OF
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Ousmane Fall</h2>
            <p className="text-sm text-muted-foreground">{MOCK_ENTREPRISE.nom}</p>
            <p className="mt-1 text-xs text-muted-foreground">Dernière connexion : aujourd&apos;hui à 18:42</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <Label className="mb-1.5 text-xs">Prénom</Label>
            <Input defaultValue="Ousmane" className="h-10 rounded-xl" />
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Nom</Label>
            <Input defaultValue="Fall" className="h-10 rounded-xl" />
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Adresse email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" defaultValue="ousmane@omadigital.sn" className="h-10 rounded-xl pl-9" />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue="+221 77 123 45 67" className="h-10 rounded-xl pl-9" />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Role</Label>
            <div className="flex h-10 items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              Administrateur comptable
            </div>
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Entreprise active</Label>
            <Input defaultValue={MOCK_ENTREPRISE.nom} className="h-10 rounded-xl" readOnly />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
          <KeyRound className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Sécurité</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="mb-1.5 text-xs">Mot de passe actuel</Label>
            <Input type="password" placeholder="********" className="h-10 rounded-xl" />
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Nouveau mot de passe</Label>
            <Input type="password" placeholder="********" className="h-10 rounded-xl" />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl">Annuler</Button>
        <Button className="gap-2 rounded-xl bg-[#1B4332] text-white shadow-lg shadow-[#1B4332]/20 hover:bg-[#2D6A4F]">
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
