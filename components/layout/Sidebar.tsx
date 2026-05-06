'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, FileText, ShoppingCart, Landmark, BookOpen,
  Building2, Package, Users2, Calculator, BarChart3, Settings,
  ChevronLeft, ChevronRight, Receipt, FileSpreadsheet, Wallet,
  CreditCard, TrendingUp, UserCheck, CalendarDays, Shield, Search,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: LayoutDashboard },
  { name: 'Facturation', icon: FileText, children: [
    { name: 'Factures', href: '/facturation/factures', icon: Receipt },
    { name: 'Devis', href: '/facturation/devis', icon: FileSpreadsheet },
    { name: 'Avoirs', href: '/facturation/avoirs', icon: FileText },
  ]},
  { name: 'Achats', icon: ShoppingCart, children: [
    { name: 'Fournisseurs', href: '/achats/fournisseurs', icon: Users2 },
    { name: 'Factures achat', href: '/achats/factures-achat', icon: Receipt },
    { name: 'Notes de frais', href: '/achats/notes-frais', icon: Wallet },
  ]},
  { name: 'Trésorerie', icon: Landmark, children: [
    { name: 'Banques', href: '/tresorerie/banques', icon: Landmark },
    { name: 'Caisses', href: '/tresorerie/caisses', icon: Wallet },
    { name: 'Mobile Money', href: '/tresorerie/mobile-money', icon: CreditCard },
    { name: 'Rapprochement', href: '/tresorerie/rapprochement', icon: Search },
  ]},
  { name: 'Comptabilité', icon: BookOpen, children: [
    { name: 'Plan comptable', href: '/comptabilite/plan-comptable', icon: BookOpen },
    { name: 'Journal', href: '/comptabilite/journal', icon: FileText },
    { name: 'Grand Livre', href: '/comptabilite/grand-livre', icon: FileSpreadsheet },
    { name: 'Balance', href: '/comptabilite/balance', icon: TrendingUp },
  ]},
  { name: 'Immobilisations', href: '/immobilisations', icon: Building2 },
  { name: 'Stocks', href: '/stocks/produits', icon: Package },
  { name: 'RH / Paie', icon: UserCheck, children: [
    { name: 'Employés', href: '/rh-paie/employes', icon: Users2 },
    { name: 'Bulletins de paie', href: '/rh-paie/bulletins-paie', icon: FileText },
    { name: 'Décl. sociales', href: '/rh-paie/declarations-sociales', icon: Shield },
  ]},
  { name: 'Fiscal', icon: Calculator, children: [
    { name: 'TVA', href: '/fiscal/tva', icon: Calculator },
    { name: 'IS', href: '/fiscal/is', icon: BarChart3 },
    { name: 'Retenues', href: '/fiscal/retenues', icon: Receipt },
    { name: 'Calendrier', href: '/fiscal/declarations', icon: CalendarDays },
  ]},
  { name: 'Rapports', href: '/rapports/tableau-bord', icon: BarChart3 },
  { name: 'Clients', href: '/clients', icon: Users2 },
  { name: 'Paramètres', href: '/parametres/entreprise', icon: Settings },
];
const defaultMobileMenus = navigation
  .map((item) => ('children' in item ? item.name : null))
  .filter((name): name is string => Boolean(name));

type SidebarProps = {
  variant?: 'desktop' | 'mobile';
  className?: string;
  onNavigate?: () => void;
};

export default function Sidebar({ variant = 'desktop', className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = variant === 'mobile';
  const [openMenus, setOpenMenus] = useState<string[]>(() => (isMobile ? defaultMobileMenus : ['Facturation']));
  const isCollapsed = !isMobile && collapsed;

  const toggleMenu = (name: string) => {
    setOpenMenus(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'z-40 flex flex-col transition-all duration-300 ease-in-out sidebar-glow',
        'bg-[#1B4332] text-white/80',
        isMobile ? 'relative h-full w-full shadow-none' : 'fixed left-0 top-0 h-screen',
        !isMobile && (isCollapsed ? 'w-[68px]' : 'w-[260px]'),
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image
            src="/oma-compta-mark.svg"
            alt="OMA Compta"
            width={36}
            height={36}
            priority
            className="w-9 h-9 rounded-lg shrink-0 shadow-lg"
          />
          {!isCollapsed && (
            <div className="animate-fade-in-up">
              <h1 className="text-base font-bold text-white font-[family-name:var(--font-heading)] tracking-tight">OMA Compta</h1>
              <p className="text-[10px] text-white/50 tracking-wider uppercase">SYSCOHADA Révisé</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="px-2 space-y-0.5">
          {navigation.map((item) => {
            if (item.children) {
              const isOpen = openMenus.includes(item.name);
              const hasActiveChild = item.children.some(c => isActive(c.href));

              if (isCollapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger className={cn(
                      'w-full flex items-center justify-center h-10 rounded-lg transition-all duration-200',
                      hasActiveChild ? 'bg-white/15 text-[#C9A84C]' : 'hover:bg-white/8 text-white/70 hover:text-white'
                    )}>
                      <item.icon className="w-5 h-5 shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-[#132E22] text-white border-white/10">
                      <div className="space-y-1">
                        <p className="font-semibold text-xs">{item.name}</p>
                        {item.children.map(child => (
                          <Link key={child.href} href={child.href} onClick={onNavigate}
                            className={cn('block text-xs py-0.5', isActive(child.href) ? 'text-[#C9A84C]' : 'text-white/70 hover:text-white')}>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 h-10 rounded-lg transition-all duration-200 group text-sm',
                      hasActiveChild ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70 hover:text-white'
                    )}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="flex-1 text-left truncate">{item.name}</span>
                    <ChevronRight className={cn('w-3.5 h-3.5 transition-transform duration-200', isOpen && 'rotate-90')} />
                  </button>
                  <div className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-40 opacity-100 mt-0.5' : 'max-h-0 opacity-0'
                  )}>
                    {item.children.map(child => (
                      <Link key={child.href} href={child.href} onClick={onNavigate}
                        className={cn(
                          'flex items-center gap-3 pl-10 pr-3 h-9 rounded-lg text-[13px] transition-all duration-150',
                          isActive(child.href)
                            ? 'bg-[#C9A84C]/15 text-[#C9A84C] font-medium'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                        )}>
                        <span className="truncate">{child.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const href = item.href!;
            if (isCollapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger className={cn(
                    'flex items-center justify-center h-10 rounded-lg transition-all duration-200 w-full',
                    isActive(href) ? 'bg-[#C9A84C]/15 text-[#C9A84C]' : 'hover:bg-white/8 text-white/70 hover:text-white'
                  )}>
                    <Link href={href} onClick={onNavigate} className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5 shrink-0" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#132E22] text-white border-white/10">{item.name}</TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link key={item.name} href={href} onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 px-3 h-10 rounded-lg transition-all duration-200 text-sm',
                  isActive(href)
                    ? 'bg-[#C9A84C]/15 text-[#C9A84C] font-medium'
                    : 'hover:bg-white/5 text-white/70 hover:text-white'
                )}>
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {!isMobile && (
        <div className="p-2 border-t border-white/10 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center h-9 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      )}
    </aside>
  );
}
