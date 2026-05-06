import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { StatutFacture, StatutDevis } from '@/types/facturation';

const statutFactureConfig: Record<StatutFacture, { label: string; className: string }> = {
  brouillon: { label: 'Brouillon', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  envoyee: { label: 'Envoyée', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  partiellement_payee: { label: 'Partiel', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  payee: { label: 'Payée', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  annulee: { label: 'Annulée', className: 'bg-red-50 text-red-700 border-red-200' },
};

const statutDevisConfig: Record<StatutDevis, { label: string; className: string }> = {
  brouillon: { label: 'Brouillon', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  envoye: { label: 'Envoyé', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  accepte: { label: 'Accepté', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  refuse: { label: 'Refusé', className: 'bg-red-50 text-red-700 border-red-200' },
  expire: { label: 'Expiré', className: 'bg-gray-100 text-gray-500 border-gray-200' },
  converti: { label: 'Converti', className: 'bg-purple-50 text-purple-700 border-purple-200' },
};

export function StatutBadgeFacture({ statut }: { statut: StatutFacture }) {
  const config = statutFactureConfig[statut];
  return (
    <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5', config.className)}>
      {config.label}
    </Badge>
  );
}

export function StatutBadgeDevis({ statut }: { statut: StatutDevis }) {
  const config = statutDevisConfig[statut];
  return (
    <Badge variant="outline" className={cn('text-[11px] font-semibold border rounded-full px-2.5 py-0.5', config.className)}>
      {config.label}
    </Badge>
  );
}
