// =============================================
// Types Facturation — OMA Compta
// =============================================

export type StatutFacture = 'brouillon' | 'envoyee' | 'partiellement_payee' | 'payee' | 'annulee';
export type StatutDevis = 'brouillon' | 'envoye' | 'accepte' | 'refuse' | 'expire' | 'converti';
export type TypeFacture = 'facture' | 'avoir' | 'proforma';
export type ModePaiement = 'virement' | 'cheque' | 'especes' | 'wave' | 'orange_money' | 'free_money' | 'carte';

export interface Client {
  id: string;
  entreprise_id: string;
  type: 'entreprise' | 'particulier';
  nom: string;
  prenom?: string;
  raison_sociale?: string;
  ninea?: string;
  rccm?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  pays: string;
  compte_comptable: string;
  delai_paiement: number;
  plafond_credit?: number;
  devise: string;
  assujetti_tva: boolean;
  notes?: string;
  actif: boolean;
  created_at: string;
  updated_at: string;
  // Calculated
  total_facture?: number;
  total_paye?: number;
  solde?: number;
}

export interface Fournisseur {
  id: string;
  entreprise_id: string;
  type: 'entreprise' | 'particulier';
  nom: string;
  raison_sociale?: string;
  ninea?: string;
  rccm?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  pays: string;
  compte_comptable: string;
  delai_paiement: number;
  devise: string;
  est_etranger: boolean;
  taux_retenue: number;
  notes?: string;
  actif: boolean;
}

export interface Article {
  id: string;
  entreprise_id: string;
  reference?: string;
  designation: string;
  type: 'service' | 'produit' | 'fourniture';
  unite: string;
  prix_vente_ht: number;
  prix_achat_ht: number;
  taux_tva: number;
  compte_vente: string;
  compte_achat: string;
  stock_actuel: number;
  stock_minimum: number;
  description?: string;
  actif: boolean;
}

export interface Facture {
  id: string;
  entreprise_id: string;
  exercice_id?: string;
  numero: string;
  type: TypeFacture;
  statut: StatutFacture;
  client_id: string;
  client?: Client;
  date_facture: string;
  date_echeance?: string;
  date_livraison?: string;
  objet?: string;
  conditions_reglement?: string;
  montant_ht: number;
  taux_remise: number;
  montant_remise: number;
  montant_ht_net: number;
  montant_tva: number;
  montant_ttc: number;
  montant_paye: number;
  montant_restant: number;
  ecriture_id?: string;
  comptabilisee: boolean;
  pdf_url?: string;
  notes?: string;
  notes_internes?: string;
  devise: string;
  lignes: LigneFacture[];
  paiements?: Paiement[];
  created_at: string;
  updated_at: string;
}

export interface LigneFacture {
  id: string;
  facture_id: string;
  article_id?: string;
  description: string;
  quantite: number;
  unite?: string;
  prix_unitaire_ht: number;
  taux_remise: number;
  montant_remise: number;
  montant_ht: number;
  taux_tva: number;
  montant_tva: number;
  montant_ttc: number;
  compte_produit?: string;
  ordre: number;
}

export interface Paiement {
  id: string;
  entreprise_id: string;
  facture_id?: string;
  facture_achat_id?: string;
  type: 'encaissement' | 'decaissement';
  date_paiement: string;
  montant: number;
  mode_paiement: ModePaiement;
  reference?: string;
  compte_banque_id?: string;
  notes?: string;
  created_at: string;
}

export interface Devis {
  id: string;
  entreprise_id: string;
  numero: string;
  client_id: string;
  client?: Client;
  statut: StatutDevis;
  date_devis: string;
  date_validite?: string;
  objet?: string;
  montant_ht: number;
  montant_tva: number;
  montant_ttc: number;
  facture_id?: string;
  notes?: string;
  lignes: LigneFacture[];
  created_at: string;
}

export interface CompteBanque {
  id: string;
  entreprise_id: string;
  type: 'banque' | 'caisse' | 'wave' | 'orange_money' | 'free_money' | 'wizall';
  libelle: string;
  banque?: string;
  numero_compte?: string;
  numero_compte_comptable: string;
  solde_initial: number;
  solde_actuel: number;
  devise: string;
  actif: boolean;
}

export interface Entreprise {
  id: string;
  nom: string;
  forme_juridique?: string;
  ninea?: string;
  rccm?: string;
  adresse?: string;
  ville?: string;
  region?: string;
  telephone?: string;
  email?: string;
  site_web?: string;
  logo_url?: string;
  devise: string;
  exercice_debut: number;
  regime_tva: 'mensuel' | 'trimestriel' | 'exonere';
  regime_is: 'normal' | 'simplifie';
  secteur_activite?: string;
}

export interface Utilisateur {
  id: string;
  entreprise_id: string;
  nom: string;
  prenom?: string;
  email: string;
  role: 'admin' | 'comptable' | 'directeur' | 'commercial' | 'lecture_seule';
  telephone?: string;
  avatar_url?: string;
  actif: boolean;
}
