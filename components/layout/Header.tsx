'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, Search, Globe, ChevronDown, LogOut, User, Settings, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_ENTREPRISE } from '@/lib/mock-data';

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  function handleLogout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    router.replace('/login');
  }

  return (
    <header className="h-16 border-b border-border bg-white/85 backdrop-blur-md flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          className="h-10 w-10 rounded-xl border border-border bg-white text-foreground shadow-sm flex items-center justify-center"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/oma-compta-mark.svg"
            alt="OMA Compta"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-lg"
          />
          <span className="hidden min-[420px]:inline text-sm font-bold text-[#1B4332]">OMA Compta</span>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher (clients, factures, comptes...)"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-transparent focus:border-primary/20 focus:bg-white text-sm transition-all duration-200 outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
        {/* Language toggle */}
        <button className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          <span className="font-medium">FR</span>
        </button>

        {/* Notifications */}
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 h-10 px-2 rounded-xl hover:bg-muted transition-colors outline-none">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white text-xs font-bold">
                  OF
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-foreground leading-none">Ousmane Fall</p>
                <p className="text-[11px] text-muted-foreground">{MOCK_ENTREPRISE.nom}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden lg:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2.5 border-b">
              <p className="text-sm font-semibold">Ousmane Fall</p>
              <p className="text-xs text-muted-foreground">ousmane@omadigital.sn</p>
              <p className="text-xs text-muted-foreground mt-0.5">Rôle : Administrateur</p>
            </div>
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push('/parametres/profil')}>
              <User className="w-4 h-4" /> Mon profil
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push('/parametres/entreprise')}>
              <Settings className="w-4 h-4" /> Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-600 cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
