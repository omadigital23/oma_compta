/**
 * Calculs TVA — Fiscalité sénégalaise
 */

export const TAUX_TVA = {
  NORMAL: 18,     // 18% — taux standard Sénégal
  REDUIT: 10,     // 10% — hôtellerie/restauration agréées
  EXONERE: 0,     // 0% — santé, éducation, exportations
} as const;

export type TauxTVA = typeof TAUX_TVA[keyof typeof TAUX_TVA];

export const TVA_LABELS: Record<number, string> = {
  18: 'TVA 18% (Standard)',
  10: 'TVA 10% (Réduit)',
  0: 'Exonéré',
};

export function calculerTVA(montantHT: number, taux: number = TAUX_TVA.NORMAL) {
  const montantTVA = (montantHT * taux) / 100;
  return {
    montantHT: Math.round(montantHT),
    taux,
    montantTVA: Math.round(montantTVA),
    montantTTC: Math.round(montantHT + montantTVA),
  };
}

export function calculerHT(montantTTC: number, taux: number = TAUX_TVA.NORMAL) {
  const montantHT = montantTTC / (1 + taux / 100);
  const montantTVA = montantTTC - montantHT;
  return {
    montantHT: Math.round(montantHT),
    taux,
    montantTVA: Math.round(montantTVA),
    montantTTC: Math.round(montantTTC),
  };
}

export function calculerLigneTVA(
  quantite: number,
  prixUnitaireHT: number,
  tauxRemise: number = 0,
  tauxTVA: number = TAUX_TVA.NORMAL
) {
  const montantBrut = quantite * prixUnitaireHT;
  const montantRemise = Math.round(montantBrut * tauxRemise / 100);
  const montantHT = Math.round(montantBrut - montantRemise);
  const montantTVA = Math.round(montantHT * tauxTVA / 100);
  const montantTTC = montantHT + montantTVA;
  return { montantBrut, montantRemise, montantHT, montantTVA, montantTTC };
}

// Retenues à la source
export const RETENUES = {
  PRESTATAIRE_ETRANGER: 20,   // 20% sans établissement au SN
  PRESTATAIRE_LOCAL_CGU: 5,   // 5% prestataire local CGU
  DIVIDENDES: 10,             // 10% retenue sur dividendes
  INTERETS: 16,               // 16% (8% si banque sénégalaise)
  INTERETS_BANQUE_SN: 8,      // 8% banque locale
} as const;

// Impôt sur les Sociétés
export const IS = {
  TAUX: 30,                   // 30% sur bénéfices
  IMF_MIN: 500_000,           // Impôt Minimum Forfaitaire min
  IMF_MAX: 5_000_000,         // Impôt Minimum Forfaitaire max
} as const;

// Cotisations sociales sénégalaises
export const COTISATIONS_SOCIALES = {
  IPRES_GENERAL_SALARIE: 5.6,
  IPRES_GENERAL_PATRONAL: 8.4,
  IPRES_CADRE_SALARIE: 2.4,
  IPRES_CADRE_PATRONAL: 3.6,
  CSS_SALARIE: 3,
  CSS_PATRONAL: 7,
  CONGES_PAYES_JOURS_MOIS: 2.5,
} as const;
