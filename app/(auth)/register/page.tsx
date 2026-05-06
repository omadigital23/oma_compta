'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle2, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-[#1B4332]/10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden bg-[#1B4332] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/oma-compta-mark.svg" alt="OMA Compta" width={44} height={44} className="h-11 w-11 rounded-xl" />
              <div>
                <p className="text-lg font-bold">OMA Compta</p>
                <p className="text-xs uppercase tracking-wider text-white/55">Démo SYSCOHADA</p>
              </div>
            </div>
            <div className="mt-14 max-w-sm">
              <h1 className="text-3xl font-bold leading-tight">Créez un espace comptable prêt pour la démo.</h1>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Les données restent fictives pour la présentation client, avec une expérience complète de bout en bout.
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/75">
            {['Plan SYSCOHADA intégré', 'Facturation et trésorerie prêtes', 'Aucune donnée réelle requise'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#C9A84C]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <Link href="/login" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1B4332]">
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </Link>

            <div className="mb-8">
              <div className="mb-5 flex items-center gap-3 lg:hidden">
                <Image src="/oma-compta-mark.svg" alt="OMA Compta" width={40} height={40} className="h-10 w-10 rounded-xl" />
                <span className="text-lg font-bold text-[#1B4332]">OMA Compta</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Créer un compte</h2>
              <p className="mt-1 text-sm text-muted-foreground">Accès de démonstration pour présenter l’application.</p>
            </div>

            <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); window.location.href = '/facturation/factures'; }}>
              <div>
                <Label className="mb-1.5 text-sm">Nom complet</Label>
                <Input defaultValue="Ousmane Fall" className="h-11 rounded-xl bg-white" />
              </div>
              <div>
                <Label className="mb-1.5 text-sm">Entreprise</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="OMA Digital" className="h-11 rounded-xl bg-white pl-9" />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 text-sm">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" defaultValue="ousmane@omadigital.sn" className="h-11 rounded-xl bg-white pl-9" />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 text-sm">Mot de passe</Label>
                <Input type="password" defaultValue="password123" className="h-11 rounded-xl bg-white" />
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>Mode démo : aucune donnée réelle n’est envoyée. Le bouton ouvre directement l’espace comptable mock.</p>
                </div>
              </div>

              <Button className="h-11 w-full gap-2 rounded-xl bg-[#1B4332] text-white shadow-lg shadow-[#1B4332]/20 hover:bg-[#2D6A4F]">
                <UserPlus className="h-4 w-4" />
                Créer le compte démo
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
