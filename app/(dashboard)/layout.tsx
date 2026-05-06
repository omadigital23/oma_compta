'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar className="hidden lg:flex" />
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[300px] max-w-[88vw] border-0 bg-[#1B4332] p-0 text-white shadow-2xl"
        >
          <Sidebar variant="mobile" onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="min-w-0 transition-all duration-300 lg:pl-[260px]">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
