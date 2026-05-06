'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-[#1B4332]/10 lg:grid-cols-[1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <Link href="/login" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1B4332]">
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </Link>

            <div className="mb-8 flex items-center gap-3">
              <Image src="/oma-compta-mark.svg" alt="OMA Compta" width={42} height={42} className="h-11 w-11 rounded-xl" />
              <div>
                <p className="text-lg font-bold text-[#1B4332]">OMA Compta</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Accès sécurisé</p>
              </div>
            </div>

            <div className="max-w-md">
              <h1 className="text-2xl font-bold text-foreground">Réinitialiser le mot de passe</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Entrez l’adresse email du compte. En mode démo, nous affichons une confirmation sans envoyer d’email réel.
              </p>

              <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
                <div>
                  <Label className="mb-1.5 text-sm">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="email" defaultValue="ousmane@omadigital.sn" className="h-11 rounded-xl bg-white pl-9" />
                  </div>
                </div>

                {sent && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>Lien de récupération simulé. Pour la démo, utilisez simplement le mot de passe de test.</p>
                    </div>
                  </div>
                )}

                <Button className="h-11 w-full gap-2 rounded-xl bg-[#1B4332] text-white shadow-lg shadow-[#1B4332]/20 hover:bg-[#2D6A4F]">
                  <Send className="h-4 w-4" />
                  Envoyer le lien
                </Button>
              </form>
            </div>
          </div>

          <aside className="hidden bg-[#1B4332] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">Démonstration client</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight">Un parcours complet, même sans backend réel.</h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-white/70">
              Les pages d’accès sont présentes pour éviter les ruptures pendant la présentation. L’authentification réelle pourra être branchée ensuite.
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
