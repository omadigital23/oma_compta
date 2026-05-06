import type { Article, Devis } from '@/types/facturation';
import { MOCK_CLIENTS, MOCK_COMPTES_BANQUE, MOCK_FACTURES } from '@/lib/mock-data';
import { MOCK_EMPLOYES, MOCK_FOURNISSEURS } from '@/lib/mock-data-phase2';

export const MOCK_DEVIS: Devis[] = [
  {
    id: 'dev1',
    entreprise_id: '1',
    numero: 'DEV-2026-0018',
    client_id: 'c2',
    client: MOCK_CLIENTS[1],
    statut: 'accepte',
    date_devis: '2026-04-22',
    date_validite: '2026-05-22',
    objet: 'Audit UX et refonte parcours onboarding',
    montant_ht: 3_200_000,
    montant_tva: 576_000,
    montant_ttc: 3_776_000,
    facture_id: 'f3',
    lignes: [],
    created_at: '2026-04-22',
  },
  {
    id: 'dev2',
    entreprise_id: '1',
    numero: 'DEV-2026-0019',
    client_id: 'c1',
    client: MOCK_CLIENTS[0],
    statut: 'envoye',
    date_devis: '2026-05-02',
    date_validite: '2026-06-01',
    objet: 'Maintenance applicative annuelle',
    montant_ht: 9_600_000,
    montant_tva: 1_728_000,
    montant_ttc: 11_328_000,
    lignes: [],
    created_at: '2026-05-02',
  },
  {
    id: 'dev3',
    entreprise_id: '1',
    numero: 'DEV-2026-0020',
    client_id: 'c3',
    client: MOCK_CLIENTS[2],
    statut: 'brouillon',
    date_devis: '2026-05-04',
    date_validite: '2026-06-03',
    objet: 'Portail fournisseur et reporting comptable',
    montant_ht: 6_850_000,
    montant_tva: 1_233_000,
    montant_ttc: 8_083_000,
    lignes: [],
    created_at: '2026-05-04',
  },
  {
    id: 'dev4',
    entreprise_id: '1',
    numero: 'DEV-2026-0015',
    client_id: 'c4',
    client: MOCK_CLIENTS[3],
    statut: 'expire',
    date_devis: '2026-03-12',
    date_validite: '2026-04-11',
    objet: 'Campagne acquisition mobile money',
    montant_ht: 4_100_000,
    montant_tva: 738_000,
    montant_ttc: 4_838_000,
    lignes: [],
    created_at: '2026-03-12',
  },
];

export const MOCK_AVOIRS = [
  {
    id: 'av1',
    numero: 'AVO-2026-0001',
    facture: MOCK_FACTURES[1],
    client: MOCK_CLIENTS[2],
    date_avoir: '2026-05-03',
    motif: 'Remise commerciale post-facturation',
    montant_ht: 375_000,
    montant_tva: 67_500,
    montant_ttc: 442_500,
    statut: 'comptabilise',
  },
  {
    id: 'av2',
    numero: 'AVO-2026-0002',
    facture: MOCK_FACTURES[3],
    client: MOCK_CLIENTS[0],
    date_avoir: '2026-05-05',
    motif: 'Correction de quantite sur livraison',
    montant_ht: 280_000,
    montant_tva: 50_400,
    montant_ttc: 330_400,
    statut: 'emis',
  },
  {
    id: 'av3',
    numero: 'AVO-2026-0003',
    facture: MOCK_FACTURES[4],
    client: MOCK_CLIENTS[1],
    date_avoir: '2026-05-06',
    motif: 'Geste commercial avant envoi',
    montant_ht: 150_000,
    montant_tva: 27_000,
    montant_ttc: 177_000,
    statut: 'brouillon',
  },
];

export const MOCK_NOTES_FRAIS = [
  {
    id: 'nf1',
    numero: 'NDF-2026-0012',
    employe: MOCK_EMPLOYES[1],
    periode: 'Avril 2026',
    date_soumission: '2026-05-02',
    statut: 'approuvee',
    montant_ht: 182_000,
    montant_tva: 18_900,
    montant_ttc: 200_900,
    rembourse: 200_900,
    lignes: [
      { categorie: 'Transport', montant: 72_000 },
      { categorie: 'Repas mission', montant: 48_900 },
      { categorie: 'Internet mobile', montant: 80_000 },
    ],
  },
  {
    id: 'nf2',
    numero: 'NDF-2026-0013',
    employe: MOCK_EMPLOYES[2],
    periode: 'Avril 2026',
    date_soumission: '2026-05-04',
    statut: 'en_validation',
    montant_ht: 96_000,
    montant_tva: 0,
    montant_ttc: 96_000,
    rembourse: 0,
    lignes: [
      { categorie: 'Taxi', montant: 36_000 },
      { categorie: 'Representation', montant: 60_000 },
    ],
  },
  {
    id: 'nf3',
    numero: 'NDF-2026-0014',
    employe: MOCK_EMPLOYES[3],
    periode: 'Mai 2026',
    date_soumission: '2026-05-06',
    statut: 'brouillon',
    montant_ht: 28_000,
    montant_tva: 0,
    montant_ttc: 28_000,
    rembourse: 0,
    lignes: [{ categorie: 'Transport', montant: 28_000 }],
  },
];

export const MOCK_MOUVEMENTS_CAISSE = [
  { id: 'mc1', compte_id: 'b2', date: '2026-05-01', libelle: 'Avance caisse bureau', piece: 'CAI-2026-044', type: 'entree', montant: 350_000, solde_apres: 875_000 },
  { id: 'mc2', compte_id: 'b2', date: '2026-05-02', libelle: 'Petites fournitures', piece: 'CAI-2026-045', type: 'sortie', montant: 42_500, solde_apres: 832_500 },
  { id: 'mc3', compte_id: 'b2', date: '2026-05-03', libelle: 'Course administrative DGID', piece: 'CAI-2026-046', type: 'sortie', montant: 18_000, solde_apres: 814_500 },
  { id: 'mc4', compte_id: 'b2', date: '2026-05-05', libelle: 'Reapprovisionnement caisse', piece: 'CAI-2026-047', type: 'entree', montant: 250_000, solde_apres: 1_064_500 },
];

export const MOCK_RAPPROCHEMENTS = [
  { id: 'rb1', date: '2026-05-01', libelle: 'Virement recu - Sonatel SA', montant: 5_900_000, type: 'credit', ecriture: 'BNQ-2026-0015', statut: 'rapproche', score: 98 },
  { id: 'rb2', date: '2026-05-02', libelle: 'Reglement fournisseur IGD', montant: 1_003_000, type: 'debit', ecriture: 'ACH-2026-0001', statut: 'rapproche', score: 94 },
  { id: 'rb3', date: '2026-05-03', libelle: 'Frais bancaires Avril', montant: 12_500, type: 'debit', ecriture: 'A creer', statut: 'a_traiter', score: 0 },
  { id: 'rb4', date: '2026-05-04', libelle: 'Virement paie Avril 2026', montant: 1_570_000, type: 'debit', ecriture: 'OD-PAIE-2026-04', statut: 'a_valider', score: 82 },
  { id: 'rb5', date: '2026-05-05', libelle: 'Reglement client TSP', montant: 2_585_500, type: 'credit', ecriture: 'Suggestion FCT-2026-0004', statut: 'a_valider', score: 76 },
];

export const MOCK_ARTICLES: Article[] = [
  { id: 'art1', entreprise_id: '1', reference: 'SRV-WEB-001', designation: 'Developpement application web', type: 'service', unite: 'forfait', prix_vente_ht: 2_500_000, prix_achat_ht: 0, taux_tva: 18, compte_vente: '706', compte_achat: '604', stock_actuel: 0, stock_minimum: 0, actif: true },
  { id: 'art2', entreprise_id: '1', reference: 'SRV-MNT-001', designation: 'Maintenance mensuelle', type: 'service', unite: 'mois', prix_vente_ht: 800_000, prix_achat_ht: 0, taux_tva: 18, compte_vente: '706', compte_achat: '604', stock_actuel: 0, stock_minimum: 0, actif: true },
  { id: 'art3', entreprise_id: '1', reference: 'MAT-LAP-014', designation: 'Ordinateur portable equipe projet', type: 'produit', unite: 'piece', prix_vente_ht: 950_000, prix_achat_ht: 720_000, taux_tva: 18, compte_vente: '707', compte_achat: '601', stock_actuel: 7, stock_minimum: 5, actif: true },
  { id: 'art4', entreprise_id: '1', reference: 'FOU-PAP-002', designation: 'Ramette papier A4', type: 'fourniture', unite: 'carton', prix_vente_ht: 0, prix_achat_ht: 18_500, taux_tva: 18, compte_vente: '707', compte_achat: '606', stock_actuel: 3, stock_minimum: 8, actif: true },
  { id: 'art5', entreprise_id: '1', reference: 'LIC-SAA-008', designation: 'Licence SaaS comptabilite', type: 'service', unite: 'licence', prix_vente_ht: 450_000, prix_achat_ht: 120_000, taux_tva: 18, compte_vente: '706', compte_achat: '604', stock_actuel: 25, stock_minimum: 10, actif: true },
];

export const MOCK_MOUVEMENTS_STOCK = [
  { id: 'ms1', article_id: 'art3', date: '2026-04-28', type: 'entree', quantite: 10, cout_unitaire: 720_000, reference: 'ACH-2026-0005' },
  { id: 'ms2', article_id: 'art3', date: '2026-05-02', type: 'sortie', quantite: 3, cout_unitaire: 720_000, reference: 'BL-2026-0018' },
  { id: 'ms3', article_id: 'art4', date: '2026-05-03', type: 'sortie', quantite: 5, cout_unitaire: 18_500, reference: 'CAI-2026-045' },
  { id: 'ms4', article_id: 'art5', date: '2026-05-05', type: 'entree', quantite: 15, cout_unitaire: 120_000, reference: 'ACH-2026-0006' },
];

export const MOCK_IMMOBILISATIONS = [
  { id: 'im1', reference: 'IMO-2024-001', designation: 'Serveur de production', categorie: 'Materiel informatique', compte: '244', date_acquisition: '2024-01-15', fournisseur: MOCK_FOURNISSEURS[2], valeur_acquisition: 4_800_000, duree_annees: 4, amortissement_cumule: 2_800_000, dotation_annuelle: 1_200_000, vnc: 2_000_000, statut: 'en_service' },
  { id: 'im2', reference: 'IMO-2025-004', designation: 'Vehicule commercial', categorie: 'Materiel de transport', compte: '245', date_acquisition: '2025-06-01', fournisseur: MOCK_FOURNISSEURS[0], valeur_acquisition: 12_500_000, duree_annees: 5, amortissement_cumule: 2_083_333, dotation_annuelle: 2_500_000, vnc: 10_416_667, statut: 'en_service' },
  { id: 'im3', reference: 'IMO-2026-002', designation: 'Licences design equipe', categorie: 'Logiciels', compte: '213', date_acquisition: '2026-02-10', fournisseur: MOCK_FOURNISSEURS[2], valeur_acquisition: 1_800_000, duree_annees: 3, amortissement_cumule: 150_000, dotation_annuelle: 600_000, vnc: 1_650_000, statut: 'en_service' },
  { id: 'im4', reference: 'IMO-2023-006', designation: 'Mobilier salle reunion', categorie: 'Materiel de bureau', compte: '244', date_acquisition: '2023-09-01', fournisseur: MOCK_FOURNISSEURS[0], valeur_acquisition: 950_000, duree_annees: 10, amortissement_cumule: 253_333, dotation_annuelle: 95_000, vnc: 696_667, statut: 'en_service' },
];

export const MOCK_RETENUES_SOURCE = [
  { id: 'rs1', tiers: 'AWS Africa', nature: 'Prestataire etranger', base: 1_250_000, taux: 20, montant: 250_000, date: '2026-05-01', echeance: '2026-06-15', statut: 'a_declarer', compte: '4435' },
  { id: 'rs2', tiers: 'Telecoms Service Plus', nature: 'Prestataire local CGU', base: 450_000, taux: 5, montant: 22_500, date: '2026-04-15', echeance: '2026-05-15', statut: 'declaree', compte: '4435' },
  { id: 'rs3', tiers: 'Associes OMA Digital', nature: 'Dividendes', base: 5_000_000, taux: 10, montant: 500_000, date: '2026-04-30', echeance: '2026-05-15', statut: 'payee', compte: '447' },
  { id: 'rs4', tiers: 'Banque partenaire', nature: 'Interets', base: 900_000, taux: 8, montant: 72_000, date: '2026-05-05', echeance: '2026-06-15', statut: 'a_declarer', compte: '447' },
];

export const MOCK_ACOMPTES_IS = [
  { periode: 'Acompte T1', echeance: '2026-03-31', base: 8_400_000, montant: 630_000, statut: 'paye' },
  { periode: 'Acompte T2', echeance: '2026-06-30', base: 13_200_000, montant: 990_000, statut: 'a_venir' },
  { periode: 'Acompte T3', echeance: '2026-09-30', base: 17_600_000, montant: 1_320_000, statut: 'projete' },
  { periode: 'Solde IS', echeance: '2027-04-30', base: 0, montant: 2_160_000, statut: 'projete' },
];

export const MOCK_DECLARATIONS_FISCALES = [
  { id: 'df1', type: 'TVA', periode: 'Avril 2026', echeance: '2026-05-15', montant: 1_450_000, statut: 'en_cours', organisme: 'DGID' },
  { id: 'df2', type: 'Retenues', periode: 'Avril 2026', echeance: '2026-05-15', montant: 594_500, statut: 'en_cours', organisme: 'DGID' },
  { id: 'df3', type: 'IPRES', periode: 'Avril 2026', echeance: '2026-05-10', montant: 633_600, statut: 'a_deposer', organisme: 'IPRES' },
  { id: 'df4', type: 'CSS', periode: 'Avril 2026', echeance: '2026-05-10', montant: 420_000, statut: 'a_deposer', organisme: 'CSS' },
  { id: 'df5', type: 'IS', periode: 'T2 2026', echeance: '2026-06-30', montant: 990_000, statut: 'a_venir', organisme: 'DGID' },
  { id: 'df6', type: 'TVA', periode: 'Mai 2026', echeance: '2026-06-15', montant: 0, statut: 'a_venir', organisme: 'DGID' },
];

export const MOCK_DECLARATIONS_SOCIALES = [
  { id: 'ds1', organisme: 'IPRES', periode: 'Avril 2026', echeance: '2026-05-10', masse: 1_570_000, part_salariale: 105_280, part_patronale: 157_920, total: 263_200, statut: 'a_deposer' },
  { id: 'ds2', organisme: 'CSS', periode: 'Avril 2026', echeance: '2026-05-10', masse: 1_570_000, part_salariale: 47_100, part_patronale: 109_900, total: 157_000, statut: 'a_deposer' },
  { id: 'ds3', organisme: 'IPRES', periode: 'Mars 2026', echeance: '2026-04-10', masse: 1_570_000, part_salariale: 105_280, part_patronale: 157_920, total: 263_200, statut: 'deposee' },
  { id: 'ds4', organisme: 'CSS', periode: 'Mars 2026', echeance: '2026-04-10', masse: 1_570_000, part_salariale: 47_100, part_patronale: 109_900, total: 157_000, statut: 'deposee' },
];

export const MOCK_COMPTES_CAISSE = MOCK_COMPTES_BANQUE.filter((compte) => compte.type === 'caisse');
