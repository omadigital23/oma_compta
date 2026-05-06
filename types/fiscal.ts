// =============================================
// Types Fiscal — Fiscalité sénégalaise
// =============================================

export interface DeclarationTVA {
  id: string;
  entreprise_id: string;
  exercice_id: string;
  periode_debut: string;
  periode_fin: string;
  date_limite_depot: string;
  tva_collectee_18: number;
  tva_collectee_10: number;
  total_tva_collectee: number;
  tva_recup_achats: number;
  tva_recup_immo: number;
  tva_recup_services: number;
  total_tva_recuperable: number;
  tva_nette: number;
  credit_reporte: number;
  statut: 'en_cours' | 'deposee' | 'payee';
  date_depot?: string;
  date_paiement?: string;
  reference_depot?: string;
}

export interface RetenueSource {
  id: string;
  entreprise_id: string;
  fournisseur_id: string;
  facture_achat_id?: string;
  date_retenue: string;
  base_calcul: number;
  taux: number;
  montant_retenue: number;
  type: 'prestataire_etranger_20' | 'prestataire_local_5' | 'dividendes_10' | 'interets_16';
  statut: 'en_attente' | 'versee';
  date_versement?: string;
}

export interface EcheanceFiscale {
  id: string;
  type: 'tva' | 'is' | 'acompte_is' | 'retenue' | 'ipres' | 'css' | 'dads';
  libelle: string;
  date_limite: string;
  montant_estime?: number;
  statut: 'a_venir' | 'en_cours' | 'payee' | 'en_retard';
  description?: string;
}
