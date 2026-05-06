'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] relative overflow-hidden items-center justify-center p-12">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />

        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <Image
              src="/oma-compta-mark.svg"
              alt="OMA Compta"
              width={56}
              height={56}
              className="w-14 h-14 rounded-2xl shadow-2xl shadow-[#C9A84C]/30"
            />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>OMA Compta</h1>
              <p className="text-white/50 text-sm tracking-wider uppercase">SYSCOHADA Révisé</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            La comptabilité <br />
            <span className="text-[#C9A84C]">qui comprend</span> <br />
            votre business.
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-8">
            Solution de comptabilité complète conforme au SYSCOHADA Révisé, 
            conçue pour les PME sénégalaises et ouest-africaines.
            Facturation, trésorerie, paie, fiscalité — tout en un.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span className="text-white/70">SYSCOHADA Révisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/70">TVA Sénégal 18%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-white/70">Mobile Money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FAFAF8]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image
              src="/oma-compta-mark.svg"
              alt="OMA Compta"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-xl font-bold text-[#1B4332]">OMA Compta</h1>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>Bienvenue</h2>
          <p className="text-sm text-muted-foreground mb-8">Connectez-vous à votre espace comptable</p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/facturation/factures'; }}>
            <div className="space-y-1.5">
              <Label className="text-sm">Adresse email</Label>
              <Input
                type="email"
                placeholder="ousmane@entreprise.sn"
                className="rounded-xl h-11 bg-white"
                defaultValue="ousmane@omadigital.sn"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Mot de passe</Label>
                <Link href="/forgot-password" className="text-xs text-[#1B4332] hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="rounded-xl h-11 bg-white pr-10"
                  defaultValue="password123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 text-sm font-semibold shadow-lg shadow-[#1B4332]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#1B4332]/30"
            >
              <LogIn className="w-4 h-4" />
              Se connecter
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#1B4332] font-semibold hover:underline">
              Créer un compte
            </Link>
          </p>

          <p className="text-center text-[11px] text-muted-foreground mt-8">
            © 2026 OMA Compta — Conforme SYSCOHADA Révisé
          </p>
        </div>
      </div>
    </div>
  );
}
