/**
 * Génération de numéros de pièces comptables
 */

export function genererNumeroPiece(prefix: string, annee: number, numero: number): string {
  return `${prefix}-${annee}-${String(numero).padStart(4, '0')}`;
}

export function genererNumeroFacture(annee: number, numero: number): string {
  return genererNumeroPiece('FCT', annee, numero);
}

export function genererNumeroDevis(annee: number, numero: number): string {
  return genererNumeroPiece('DEV', annee, numero);
}

export function genererNumeroAvoir(annee: number, numero: number): string {
  return genererNumeroPiece('AVO', annee, numero);
}

export function genererNumeroEcriture(journal: string, annee: number, numero: number): string {
  return genererNumeroPiece(journal, annee, numero);
}

export function extraireAnneeNumero(reference: string): { prefix: string; annee: number; numero: number } | null {
  const match = reference.match(/^([A-Z]+)-(\d{4})-(\d+)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    annee: parseInt(match[2]),
    numero: parseInt(match[3]),
  };
}
