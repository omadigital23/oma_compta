import { CheckCircle2, Clock, Download, FileText, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_DECLARATIONS_SOCIALES } from '@/lib/mock-data-phase3';
import { MOCK_EMPLOYES } from '@/lib/mock-data-phase2';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { calculerBulletin } from '@/types/rh';
import { cn } from '@/lib/utils';

const statutConfig = {
  a_deposer: { label: 'A deposer', icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  deposee: { label: 'Deposee', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function DeclarationsSocialesPage() {
  const bulletins = MOCK_EMPLOYES.map((employe) => calculerBulletin(employe));
  const masseSalariale = MOCK_EMPLOYES.reduce((sum, employe) => sum + employe.salaire_base, 0);
  const totalIPRES = bulletins.reduce((sum, bulletin) => sum + bulletin.ipres_gen_salarie + bulletin.ipres_cadre_salarie + bulletin.ipres_gen_patronal + bulletin.ipres_cadre_patronal, 0);
  const totalCSS = bulletins.reduce((sum, bulletin) => sum + bulletin.css_salarie + bulletin.css_patronal, 0);
  const totalSocial = totalIPRES + totalCSS;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Declarations sociales</h1>
          <p className="text-sm text-muted-foreground mt-1">Etats mensuels IPRES, CSS et DADS annuelle pour le Senegal.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Download className="w-4 h-4" />
          Exporter bordereaux
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Employes actifs', value: String(MOCK_EMPLOYES.length), icon: Users, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Masse salariale', value: formatFCFA(masseSalariale), icon: FileText, color: 'text-foreground', bg: 'bg-gray-100' },
          { label: 'IPRES mois', value: formatFCFA(totalIPRES), icon: ShieldCheck, color: 'text-[#1B4332]', bg: 'bg-[#1B4332]/10' },
          { label: 'CSS mois', value: formatFCFA(totalCSS), icon: ShieldCheck, color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', metric.bg)}>
                <metric.icon className={cn('w-3.5 h-3.5', metric.color)} />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className={cn('text-lg font-bold font-money', metric.color)}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Organisme', 'Periode', 'Echeance', 'Masse', 'Part salariee', 'Part patronale', 'Total', 'Statut'].map((header) => (
                    <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_DECLARATIONS_SOCIALES.map((declaration) => {
                  const config = statutConfig[declaration.statut as keyof typeof statutConfig];
                  const Icon = config.icon;
                  return (
                    <tr key={declaration.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-bold text-[#1B4332]">{declaration.organisme}</td>
                      <td className="px-5 py-3.5 text-sm text-foreground">{declaration.periode}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(declaration.echeance)}</td>
                      <td className="px-5 py-3.5 text-sm font-money font-semibold">{formatFCFA(declaration.masse)}</td>
                      <td className="px-5 py-3.5 text-sm font-money text-red-700">{formatFCFA(declaration.part_salariale)}</td>
                      <td className="px-5 py-3.5 text-sm font-money text-amber-700">{formatFCFA(declaration.part_patronale)}</td>
                      <td className="px-5 py-3.5 text-sm font-bold font-money text-foreground">{formatFCFA(declaration.total)}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5 flex items-center gap-1 w-fit', config.className)}>
                          <Icon className="w-2.5 h-2.5" />
                          {config.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)] mb-4">Bordereau Avril 2026</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">IPRES general + cadre</span>
              <span className="font-bold font-money">{formatFCFA(totalIPRES)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CSS salarie + patronal</span>
              <span className="font-bold font-money">{formatFCFA(totalCSS)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total social</span>
              <span className="font-bold font-money text-[#1B4332]">{formatFCFA(totalSocial)}</span>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-[#1B4332]/5 border border-[#1B4332]/10 text-xs font-mono text-muted-foreground space-y-1">
            <p>D 663 Charges sociales</p>
            <p>C 431 IPRES</p>
            <p>C 432 CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
