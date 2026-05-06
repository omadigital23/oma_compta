'use client';

import { Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { MOCK_FACTURES } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { joursRestants } from '@/lib/utils/dates';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function FacturesEnRetard() {
  const facturesEnAttente = MOCK_FACTURES.filter(
    f => f.statut === 'envoyee' || f.statut === 'partiellement_payee'
  );

  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-heading)]">
            Factures en attente
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{facturesEnAttente.length} facture(s) impayée(s)</p>
        </div>
        <Link href="/facturation/factures" className="text-xs text-primary hover:underline flex items-center gap-1">
          Tout voir <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2.5">
        {facturesEnAttente.map((facture) => {
          const jours = facture.date_echeance ? joursRestants(facture.date_echeance) : 0;
          const enRetard = jours < 0;
          const urgent = jours >= 0 && jours <= 7;

          return (
            <div key={facture.id} className={cn(
              'flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:bg-muted/50 cursor-pointer',
              enRetard ? 'border-red-200 bg-red-50/50' : urgent ? 'border-amber-200 bg-amber-50/30' : 'border-border'
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  enRetard ? 'bg-red-100' : urgent ? 'bg-amber-100' : 'bg-muted'
                )}>
                  {enRetard ? <AlertTriangle className="w-4 h-4 text-red-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{facture.numero}</p>
                  <p className="text-xs text-muted-foreground">{facture.client?.nom}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold font-money text-foreground">{formatFCFA(facture.montant_restant)}</p>
                <p className={cn(
                  'text-[11px] font-medium',
                  enRetard ? 'text-red-600' : urgent ? 'text-amber-600' : 'text-muted-foreground'
                )}>
                  {enRetard ? `${Math.abs(jours)}j de retard` : `${jours}j restant${jours > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
