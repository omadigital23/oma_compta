// =============================================
// Types Comptabilité — SYSCOHADA Révisé
// =============================================

export interface CompteComptable {
  id: string;
  entreprise_id?: string;
  numero: string;
  intitule: string;
  classe: number;
  type_compte: 'actif' | 'passif' | 'charge' | 'produit' | 'mixte';
  nature: 'bilan' | 'gestion' | 'analytique';
  tva_applicable: boolean;
  taux_tva: number;
  compte_systeme: boolean;
  actif: boolean;
}

export interface ExerciceComptable {
  id: string;
  entreprise_id: string;
  libelle: string;
  date_debut: string;
  date_fin: string;
  statut: 'ouvert' | 'cloture' | 'archive';
  created_at: string;
}

export interface JournalComptable {
  id: string;
  entreprise_id: string;
  code: string;
  libelle: string;
  type: 'ventes' | 'achats' | 'banque' | 'caisse' | 'operations_diverses' | 'paie';
}

export interface EcritureComptable {
  id: string;
  entreprise_id: string;
  exercice_id: string;
  journal_id: string;
  date_ecriture: string;
  numero_piece?: string;
  libelle: string;
  statut: 'brouillon' | 'valide' | 'lettre' | 'exporte';
  reference_origine?: string;
  type_origine?: 'facture_vente' | 'facture_achat' | 'paie' | 'manuel';
  lignes: LigneEcriture[];
  created_at: string;
  updated_at: string;
}

export interface LigneEcriture {
  id: string;
  ecriture_id: string;
  compte_id?: string;
  numero_compte: string;
  libelle?: string;
  debit: number;
  credit: number;
  date_echeance?: string;
  tiers_id?: string;
  ordre: number;
}

export function validerEcriture(lignes: LigneEcriture[]): { valide: boolean; ecart: number } {
  const totalDebit = lignes.reduce((s, l) => s + l.debit, 0);
  const totalCredit = lignes.reduce((s, l) => s + l.credit, 0);
  const ecart = Math.abs(totalDebit - totalCredit);
  return { valide: ecart < 0.01, ecart };
}

export interface Immobilisation {
  id: string;
  entreprise_id: string;
  libelle: string;
  categorie: string;
  numero_compte: string;
  date_acquisition: string;
  valeur_acquisition: number;
  duree_amortissement: number;
  taux_amortissement: number;
  methode_amortissement: 'lineaire' | 'degressif';
  valeur_residuelle: number;
  valeur_nette_comptable: number;
  date_mise_en_service?: string;
  date_cession?: string;
  valeur_cession?: number;
  actif: boolean;
}

export interface Amortissement {
  id: string;
  immobilisation_id: string;
  exercice_id: string;
  date_amortissement: string;
  annuite: number;
  amortissements_cumules: number;
  valeur_nette_fin: number;
}
