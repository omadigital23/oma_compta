import { format, parseISO, differenceInDays, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy');
}

export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMMM yyyy', { locale: fr });
}

export function formatMoisAnnee(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM yyyy', { locale: fr });
}

export function joursRestants(dateEcheance: string | Date): number {
  const d = typeof dateEcheance === 'string' ? parseISO(dateEcheance) : dateEcheance;
  return differenceInDays(d, new Date());
}

export function estEnRetard(dateEcheance: string | Date): boolean {
  return joursRestants(dateEcheance) < 0;
}

export function getDebutMois(date?: Date): Date {
  return startOfMonth(date || new Date());
}

export function getFinMois(date?: Date): Date {
  return endOfMonth(date || new Date());
}

export function getMoisPrecedent(date?: Date): { debut: Date; fin: Date } {
  const d = subMonths(date || new Date(), 1);
  return { debut: startOfMonth(d), fin: endOfMonth(d) };
}

export function getDateLimiteTVA(mois: number, annee: number): Date {
  // La déclaration TVA est due au plus tard le 15 du mois suivant
  const moisSuivant = mois === 12 ? 1 : mois + 1;
  const anneeSuivante = mois === 12 ? annee + 1 : annee;
  return new Date(anneeSuivante, moisSuivant - 1, 15);
}

export function getExerciceComptable(annee: number, moisDebut: number = 1) {
  const debut = new Date(annee, moisDebut - 1, 1);
  const fin = endOfMonth(addMonths(debut, 11));
  return {
    debut,
    fin,
    libelle: `Exercice ${format(debut, 'yyyy')}`,
  };
}

export function getPeriodesMensuelles(annee: number): Array<{ mois: number; libelle: string; debut: Date; fin: Date }> {
  return Array.from({ length: 12 }, (_, i) => {
    const debut = new Date(annee, i, 1);
    return {
      mois: i + 1,
      libelle: format(debut, 'MMMM yyyy', { locale: fr }),
      debut,
      fin: endOfMonth(debut),
    };
  });
}
