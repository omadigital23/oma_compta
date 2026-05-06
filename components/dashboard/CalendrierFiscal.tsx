'use client';

import { CalendarDays, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MOCK_ECHEANCES_FISCALES } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { joursRestants } from '@/lib/utils/dates';
import { cn } from '@/lib/utils';

const statutConfig = {
  a_venir: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  en_cours: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  payee: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  en_retard: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
};

export function CalendrierFiscal() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-[#1B4332]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-heading)]">Échéances fiscales</h3>
            <p className="text-xs text-muted-foreground">Prochaines obligations</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {MOCK_ECHEANCES_FISCALES.slice(0, 5).map((echeance) => {
          const jours = joursRestants(echeance.date_limite);
          const config = statutConfig[echeance.statut];
          const Icon = config.icon;
          const isUrgent = jours <= 7 && jours >= 0;
          const isLate = jours < 0;

          return (
            <div key={echeance.id} className={cn(
              'flex items-center justify-between p-3 rounded-xl border transition-all duration-200',
              isLate ? 'border-red-200 bg-red-50/50' : isUrgent ? 'border-amber-200 bg-amber-50/30' : 'border-border hover:bg-muted/30'
            )}>
              <div className="flex items-center gap-2.5">
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', config.bg)}>
                  <Icon className={cn('w-3.5 h-3.5', config.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{echeance.libelle}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Échéance : {new Date(echeance.date_limite).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {echeance.montant_estime ? (
                  <p className="text-sm font-bold font-money">{formatFCFA(echeance.montant_estime)}</p>
                ) : null}
                <p className={cn(
                  'text-[11px] font-medium',
                  isLate ? 'text-red-600' : isUrgent ? 'text-amber-600' : 'text-muted-foreground'
                )}>
                  {isLate ? `${Math.abs(jours)}j de retard !` : `J-${jours}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
