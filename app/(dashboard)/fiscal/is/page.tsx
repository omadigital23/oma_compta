import { AlertTriangle, Calculator, CheckCircle2, FileText, Landmark, Percent } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ACOMPTES_IS } from '@/lib/mock-data-phase3';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const resultatComptable = 18_400_000;
const reintegrations = 2_150_000;
const deductions = 950_000;
const resultatFiscal = resultatComptable + reintegrations - deductions;
const impotSocietes = Math.round(resultatFiscal * 0.3);
const imf = Math.min(5_000_000, Math.max(500_000, Math.round(resultatComptable * 0.005)));
const impotDu = Math.max(impotSocietes, imf);
const acomptesPayes = MOCK_ACOMPTES_IS.filter((item) => item.statut === 'paye').reduce((sum, item) => sum + item.montant, 0);
const soldePrevisionnel = impotDu - acomptesPayes;

const statutConfig = {
  paye: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  a_venir: 'bg-amber-50 text-amber-700 border-amber-200',
  projete: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function ISPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Impôt sur les societes</h1>
          <p className="text-sm text-muted-foreground mt-1">Calcul IS 30%, acomptes provisionnels et controle IMF Senegal.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <FileText className="w-4 h-4" />
          Generer declaration
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Resultat fiscal', value: formatFCFA(resultatFiscal), icon: Calculator, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'IS 30%', value: formatFCFA(impotSocietes), icon: Percent, color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'IMF controle', value: formatFCFA(imf), icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Solde projete', value: formatFCFA(soldePrevisionnel), icon: Landmark, color: 'text-[#1B4332]', bg: 'bg-[#1B4332]/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)]">Passage comptable - fiscal</h3>
          </div>
          <div className="divide-y divide-border/50">
            {[
              ['Resultat comptable', resultatComptable, 'text-foreground'],
              ['Reintegrations fiscales', reintegrations, 'text-red-700'],
              ['Deductions fiscales', -deductions, 'text-emerald-700'],
              ['Resultat fiscal imposable', resultatFiscal, 'text-[#1B4332]'],
            ].map(([label, value, color]) => (
              <div key={label as string} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className={cn('text-sm font-bold font-money', color as string)}>{formatFCFA(value as number)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)]">Acomptes provisionnels</h3>
          </div>
          <div className="divide-y divide-border/50">
            {MOCK_ACOMPTES_IS.map((item) => (
              <div key={item.periode} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.periode}</p>
                  <p className="text-xs text-muted-foreground">Echeance {item.echeance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-money text-foreground">{formatFCFA(item.montant)}</p>
                  <Badge variant="outline" className={cn('mt-1 rounded-full border text-[11px]', statutConfig[item.statut as keyof typeof statutConfig])}>
                    {item.statut === 'paye' ? <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> : null}
                    {item.statut.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900">Controle IMF</p>
          <p className="text-xs text-amber-700 mt-1">
            {`L'impot minimum forfaitaire reste borne entre ${formatFCFA(500_000)} et ${formatFCFA(5_000_000)}. Ici l'IS calcule reste superieur a l'IMF, donc l'IS de ${formatFCFA(impotDu)} est retenu.`}
          </p>
        </div>
      </div>
    </div>
  );
}
