import { Client, Facture, CompteBanque, Entreprise } from '@/types/facturation';
import { EcheanceFiscale } from '@/types/fiscal';

export const MOCK_ENTREPRISE: Entreprise = {
  id: '1', nom: 'OMA Digital', forme_juridique: 'SARL', ninea: 'SN-DKR-2024-B-12345',
  rccm: 'SN-DKR-2024-B-7890', adresse: 'Sacré-Cœur 3, Villa 456', ville: 'Dakar',
  region: 'Dakar', telephone: '+221 33 867 45 23', email: 'contact@omadigital.sn',
  site_web: 'https://omadigital.sn', logo_url: '', devise: 'XOF', exercice_debut: 1,
  regime_tva: 'mensuel', regime_is: 'normal', secteur_activite: 'Services numériques',
};

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', entreprise_id: '1', type: 'entreprise', nom: 'Sonatel SA', raison_sociale: 'Sonatel SA', ninea: 'SN-123456', email: 'compta@sonatel.sn', telephone: '+221 33 839 12 00', adresse: '46 Boulevard de la République', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '411001', delai_paiement: 30, devise: 'XOF', assujetti_tva: true, actif: true, created_at: '2024-01-15', updated_at: '2024-01-15', total_facture: 12500000, total_paye: 8750000, solde: 3750000 },
  { id: 'c2', entreprise_id: '1', type: 'entreprise', nom: 'Wave Digital Finance', raison_sociale: 'Wave Digital Finance', email: 'finance@wave.com', telephone: '+221 77 123 45 67', adresse: 'Almadies, Route de Ngor', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '411002', delai_paiement: 15, devise: 'XOF', assujetti_tva: true, actif: true, created_at: '2024-02-10', updated_at: '2024-02-10', total_facture: 8400000, total_paye: 8400000, solde: 0 },
  { id: 'c3', entreprise_id: '1', type: 'entreprise', nom: 'CBAO Groupe Attijariwafa', raison_sociale: 'CBAO', email: 'contact@cbao.sn', telephone: '+221 33 849 96 96', adresse: '1 Place de l\'Indépendance', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '411003', delai_paiement: 45, devise: 'XOF', assujetti_tva: true, actif: true, created_at: '2024-03-01', updated_at: '2024-03-01', total_facture: 15000000, total_paye: 10000000, solde: 5000000 },
  { id: 'c4', entreprise_id: '1', type: 'entreprise', nom: 'Tigo Sénégal', raison_sociale: 'Tigo Sénégal SA', email: 'b2b@tigo.sn', telephone: '+221 33 859 88 00', adresse: 'Rond-point JFK', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '411004', delai_paiement: 30, devise: 'XOF', assujetti_tva: true, actif: true, created_at: '2024-04-15', updated_at: '2024-04-15', total_facture: 6200000, total_paye: 3100000, solde: 3100000 },
  { id: 'c5', entreprise_id: '1', type: 'particulier', nom: 'Diallo', prenom: 'Abdoulaye', email: 'a.diallo@gmail.com', telephone: '+221 77 654 32 10', adresse: 'Parcelles Assainies U26', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '411005', delai_paiement: 7, devise: 'XOF', assujetti_tva: false, actif: true, created_at: '2024-05-01', updated_at: '2024-05-01', total_facture: 1500000, total_paye: 1500000, solde: 0 },
];

export const MOCK_FACTURES: Facture[] = [
  { id: 'f1', entreprise_id: '1', numero: 'FCT-2026-0001', type: 'facture', statut: 'payee', client_id: 'c1', client: MOCK_CLIENTS[0], date_facture: '2026-03-15', date_echeance: '2026-04-14', montant_ht: 5000000, taux_remise: 0, montant_remise: 0, montant_ht_net: 5000000, montant_tva: 900000, montant_ttc: 5900000, montant_paye: 5900000, montant_restant: 0, comptabilisee: true, devise: 'XOF', lignes: [], created_at: '2026-03-15', updated_at: '2026-03-15' },
  { id: 'f2', entreprise_id: '1', numero: 'FCT-2026-0002', type: 'facture', statut: 'envoyee', client_id: 'c3', client: MOCK_CLIENTS[2], date_facture: '2026-04-01', date_echeance: '2026-05-01', montant_ht: 7500000, taux_remise: 5, montant_remise: 375000, montant_ht_net: 7125000, montant_tva: 1282500, montant_ttc: 8407500, montant_paye: 0, montant_restant: 8407500, comptabilisee: true, devise: 'XOF', lignes: [], created_at: '2026-04-01', updated_at: '2026-04-01' },
  { id: 'f3', entreprise_id: '1', numero: 'FCT-2026-0003', type: 'facture', statut: 'partiellement_payee', client_id: 'c4', client: MOCK_CLIENTS[3], date_facture: '2026-04-10', date_echeance: '2026-05-10', montant_ht: 3200000, taux_remise: 0, montant_remise: 0, montant_ht_net: 3200000, montant_tva: 576000, montant_ttc: 3776000, montant_paye: 2000000, montant_restant: 1776000, comptabilisee: true, devise: 'XOF', lignes: [], created_at: '2026-04-10', updated_at: '2026-04-10' },
  { id: 'f4', entreprise_id: '1', numero: 'FCT-2026-0004', type: 'facture', statut: 'envoyee', client_id: 'c1', client: MOCK_CLIENTS[0], date_facture: '2026-04-20', date_echeance: '2026-04-30', montant_ht: 2800000, taux_remise: 0, montant_remise: 0, montant_ht_net: 2800000, montant_tva: 504000, montant_ttc: 3304000, montant_paye: 0, montant_restant: 3304000, comptabilisee: false, devise: 'XOF', lignes: [], created_at: '2026-04-20', updated_at: '2026-04-20' },
  { id: 'f5', entreprise_id: '1', numero: 'FCT-2026-0005', type: 'facture', statut: 'brouillon', client_id: 'c2', client: MOCK_CLIENTS[1], date_facture: '2026-05-01', date_echeance: '2026-05-31', montant_ht: 4500000, taux_remise: 10, montant_remise: 450000, montant_ht_net: 4050000, montant_tva: 729000, montant_ttc: 4779000, montant_paye: 0, montant_restant: 4779000, comptabilisee: false, devise: 'XOF', lignes: [], created_at: '2026-05-01', updated_at: '2026-05-01' },
];

export const MOCK_COMPTES_BANQUE: CompteBanque[] = [
  { id: 'b1', entreprise_id: '1', type: 'banque', libelle: 'CBAO Compte Principal', banque: 'CBAO', numero_compte: 'SN08 C001 0001 0000 1234 5678', numero_compte_comptable: '521', solde_initial: 5000000, solde_actuel: 18450000, devise: 'XOF', actif: true },
  { id: 'b2', entreprise_id: '1', type: 'caisse', libelle: 'Caisse Principale', numero_compte_comptable: '571', solde_initial: 500000, solde_actuel: 875000, devise: 'XOF', actif: true },
  { id: 'b3', entreprise_id: '1', type: 'wave', libelle: 'Wave Business', numero_compte_comptable: '581', solde_initial: 0, solde_actuel: 2340000, devise: 'XOF', actif: true },
  { id: 'b4', entreprise_id: '1', type: 'orange_money', libelle: 'Orange Money Pro', numero_compte_comptable: '581', solde_initial: 0, solde_actuel: 1125000, devise: 'XOF', actif: true },
];

export const MOCK_CA_MENSUEL = [
  { mois: 'Juin', ca: 8200000, depenses: 5100000 },
  { mois: 'Juil', ca: 9500000, depenses: 5800000 },
  { mois: 'Août', ca: 7800000, depenses: 4900000 },
  { mois: 'Sep', ca: 11200000, depenses: 6200000 },
  { mois: 'Oct', ca: 10800000, depenses: 5500000 },
  { mois: 'Nov', ca: 12500000, depenses: 7100000 },
  { mois: 'Déc', ca: 14200000, depenses: 8400000 },
  { mois: 'Jan', ca: 9800000, depenses: 6000000 },
  { mois: 'Fév', ca: 11500000, depenses: 6800000 },
  { mois: 'Mar', ca: 13200000, depenses: 7200000 },
  { mois: 'Avr', ca: 15800000, depenses: 8100000 },
  { mois: 'Mai', ca: 12400000, depenses: 6900000 },
];

export const MOCK_ECHEANCES_FISCALES: EcheanceFiscale[] = [
  { id: 'e1', type: 'tva', libelle: 'Déclaration TVA — Avril 2026', date_limite: '2026-05-15', montant_estime: 1850000, statut: 'en_cours', description: 'Déclaration mensuelle TVA' },
  { id: 'e2', type: 'ipres', libelle: 'Cotisations IPRES — Avril 2026', date_limite: '2026-05-10', montant_estime: 980000, statut: 'a_venir', description: 'Cotisations IPRES salarié + patronal' },
  { id: 'e3', type: 'css', libelle: 'Cotisations CSS — Avril 2026', date_limite: '2026-05-10', montant_estime: 420000, statut: 'a_venir', description: 'Cotisations CSS' },
  { id: 'e4', type: 'acompte_is', libelle: 'Acompte IS — T2 2026', date_limite: '2026-06-30', montant_estime: 3500000, statut: 'a_venir', description: 'Acompte provisionnel IS' },
  { id: 'e5', type: 'tva', libelle: 'Déclaration TVA — Mai 2026', date_limite: '2026-06-15', montant_estime: 0, statut: 'a_venir', description: 'Déclaration mensuelle TVA' },
];
