// =============================================
// Types RH / Paie — Sénégal
// =============================================

export type TypeContrat = 'cdi' | 'cdd' | 'stage' | 'consultant' | 'apprentissage';
export type StatutEmploye = 'actif' | 'conge' | 'suspendu' | 'licencie';
export type CategorieIPRES = 'general' | 'cadre';

export interface Employe {
  id: string;
  entreprise_id: string;
  matricule: string;
  nom: string;
  prenom: string;
  date_naissance?: string;
  lieu_naissance?: string;
  nationalite?: string;
  nin?: string; // Numéro d'identification national
  numero_ipres?: string;
  numero_css?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  type_contrat: TypeContrat;
  date_embauche: string;
  date_fin_contrat?: string;
  poste: string;
  departement?: string;
  statut: StatutEmploye;
  salaire_base: number;
  categorie_ipres: CategorieIPRES;
  est_cadre: boolean;
  compte_bancaire?: string;
  banque?: string;
  created_at: string;
}

export interface BulletinPaie {
  id: string;
  entreprise_id: string;
  employe_id: string;
  employe?: Employe;
  mois: number;
  annee: number;
  salaire_base: number;
  primes: number;
  heures_sup: number;
  taux_hs: number;
  montant_hs: number;
  avantages_nature: number;
  brut_imposable: number;
  // Cotisations salarié
  ipres_gen_salarie: number;
  ipres_cadre_salarie: number;
  css_salarie: number;
  ipr: number;
  total_retenues_salarie: number;
  // Cotisations patronales
  ipres_gen_patronal: number;
  ipres_cadre_patronal: number;
  css_patronal: number;
  total_cotisations_patronales: number;
  // Net
  net_a_payer: number;
  cout_total_employeur: number;
  statut: 'brouillon' | 'valide' | 'paye';
  date_paiement?: string;
  ecriture_id?: string;
  created_at: string;
}

// Calcul IPR (Impôt sur le Revenu des Personnes physiques) Sénégal
export function calculerIPR(brut_mensuel: number): number {
  const annuel = brut_mensuel * 12;
  let ipr_annuel = 0;

  if (annuel <= 630_000) ipr_annuel = 0;
  else if (annuel <= 1_500_000) ipr_annuel = (annuel - 630_000) * 0.20;
  else if (annuel <= 4_000_000) ipr_annuel = 174_000 + (annuel - 1_500_000) * 0.30;
  else if (annuel <= 8_000_000) ipr_annuel = 924_000 + (annuel - 4_000_000) * 0.35;
  else if (annuel <= 13_500_000) ipr_annuel = 2_324_000 + (annuel - 8_000_000) * 0.37;
  else ipr_annuel = 4_359_000 + (annuel - 13_500_000) * 0.40;

  return Math.round(ipr_annuel / 12);
}

export function calculerBulletin(employe: Employe, primes = 0, avantages = 0) {
  const { salaire_base, est_cadre } = employe;
  const brut = salaire_base + primes + avantages;

  // IPRES
  const ipres_gen_sal = Math.round(brut * 0.056);
  const ipres_gen_pat = Math.round(brut * 0.084);
  const ipres_cad_sal = est_cadre ? Math.round(brut * 0.024) : 0;
  const ipres_cad_pat = est_cadre ? Math.round(brut * 0.036) : 0;

  // CSS
  const css_sal = Math.round(brut * 0.03);
  const css_pat = Math.round(brut * 0.07);

  const brut_imposable = brut - ipres_gen_sal - ipres_cad_sal - css_sal;
  const ipr = calculerIPR(brut_imposable);

  const net = brut - ipres_gen_sal - ipres_cad_sal - css_sal - ipr;
  const cout_employeur = brut + ipres_gen_pat + ipres_cad_pat + css_pat;

  return {
    salaire_base, primes, avantages_nature: avantages,
    brut_imposable, ipres_gen_salarie: ipres_gen_sal,
    ipres_cadre_salarie: ipres_cad_sal, css_salarie: css_sal, ipr,
    total_retenues_salarie: ipres_gen_sal + ipres_cad_sal + css_sal + ipr,
    ipres_gen_patronal: ipres_gen_pat, ipres_cadre_patronal: ipres_cad_pat, css_patronal: css_pat,
    total_cotisations_patronales: ipres_gen_pat + ipres_cad_pat + css_pat,
    net_a_payer: net, cout_total_employeur: cout_employeur,
  };
}
