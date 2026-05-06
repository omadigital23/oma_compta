import { KPIGrid } from '@/components/dashboard/KPICard';
import { CAChart } from '@/components/dashboard/CAChart';
import { FacturesEnRetard } from '@/components/dashboard/FacturesEnRetard';
import { TresorerieResume } from '@/components/dashboard/TresorerieResume';
import { CalendrierFiscal } from '@/components/dashboard/CalendrierFiscal';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
          Tableau de bord
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d&apos;ensemble de votre activité — Mai 2026
        </p>
      </div>

      {/* KPI Cards */}
      <KPIGrid />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart - takes 2 columns */}
        <div className="xl:col-span-2">
          <CAChart />
        </div>

        {/* Treasury */}
        <div>
          <TresorerieResume />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FacturesEnRetard />
        <CalendrierFiscal />
      </div>
    </div>
  );
}
