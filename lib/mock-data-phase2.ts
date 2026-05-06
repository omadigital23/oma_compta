import { Employe } from '@/types/rh';

export const MOCK_FOURNISSEURS = [
  { id: 'f1', entreprise_id: '1', type: 'entreprise', nom: 'Imprimerie Graphique Dakar', raison_sociale: 'IGD SA', ninea: 'SN-234567', email: 'contact@igd.sn', telephone: '+221 33 822 11 00', adresse: 'Zone Industrielle Dakar', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '401001', delai_paiement: 30, devise: 'XOF', est_etranger: false, taux_retenue: 0, actif: true },
  { id: 'f2', entreprise_id: '1', type: 'entreprise', nom: 'Sénélec', raison_sociale: 'Sénélec SA', email: 'clients@senelec.sn', telephone: '+221 33 839 30 00', adresse: '28 Bd de la République', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '401002', delai_paiement: 15, devise: 'XOF', est_etranger: false, taux_retenue: 0, actif: true },
  { id: 'f3', entreprise_id: '1', type: 'entreprise', nom: 'AWS Africa', raison_sociale: 'Amazon Web Services Africa', email: 'billing@aws.amazon.com', telephone: '', adresse: '1 Amazon Way', ville: 'Cape Town', pays: 'Afrique du Sud', compte_comptable: '401003', delai_paiement: 30, devise: 'USD', est_etranger: true, taux_retenue: 20, actif: true },
  { id: 'f4', entreprise_id: '1', type: 'entreprise', nom: 'Télécoms Service Plus', raison_sociale: 'TSP SARL', email: 'facturation@tsp.sn', telephone: '+221 77 900 00 00', adresse: 'Almadies, Dakar', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '401004', delai_paiement: 30, devise: 'XOF', est_etranger: false, taux_retenue: 5, actif: true },
  { id: 'f5', entreprise_id: '1', type: 'particulier', nom: 'Diop', raison_sociale: undefined, ninea: undefined, email: 'b.diop@gmail.com', telephone: '+221 77 234 56 78', adresse: 'Medina, Dakar', ville: 'Dakar', pays: 'Sénégal', compte_comptable: '401005', delai_paiement: 7, devise: 'XOF', est_etranger: false, taux_retenue: 0, actif: true },
];

export const MOCK_FACTURES_ACHAT = [
  { id: 'fa1', entreprise_id: '1', numero_interne: 'ACH-2026-0001', reference_fournisseur: 'IGD-2026-156', fournisseur_id: 'f1', fournisseur: MOCK_FOURNISSEURS[0], date_facture: '2026-04-05', date_echeance: '2026-05-05', montant_ht: 850000, montant_tva: 153000, montant_ttc: 1003000, montant_retenue: 0, montant_net_a_payer: 1003000, montant_paye: 1003000, statut: 'payee', comptabilisee: true, description: 'Fournitures de bureau Q1 2026', created_at: '2026-04-05' },
  { id: 'fa2', entreprise_id: '1', numero_interne: 'ACH-2026-0002', reference_fournisseur: 'SNELEC-APR26', fournisseur_id: 'f2', fournisseur: MOCK_FOURNISSEURS[1], date_facture: '2026-04-30', date_echeance: '2026-05-15', montant_ht: 380000, montant_tva: 0, montant_ttc: 380000, montant_retenue: 0, montant_net_a_payer: 380000, montant_paye: 0, statut: 'en_attente', comptabilisee: true, description: 'Facture électricité — Avril 2026', created_at: '2026-04-30' },
  { id: 'fa3', entreprise_id: '1', numero_interne: 'ACH-2026-0003', reference_fournisseur: 'AWS-APR-2026', fournisseur_id: 'f3', fournisseur: MOCK_FOURNISSEURS[2], date_facture: '2026-05-01', date_echeance: '2026-05-31', montant_ht: 1250000, montant_tva: 0, montant_ttc: 1250000, montant_retenue: 250000, montant_net_a_payer: 1000000, montant_paye: 0, statut: 'en_attente', comptabilisee: false, description: 'Services cloud AWS — Avril 2026 (retenue 20%)', created_at: '2026-05-01' },
  { id: 'fa4', entreprise_id: '1', numero_interne: 'ACH-2026-0004', reference_fournisseur: 'TSP-2026-089', fournisseur_id: 'f4', fournisseur: MOCK_FOURNISSEURS[3], date_facture: '2026-04-15', date_echeance: '2026-05-15', montant_ht: 450000, montant_tva: 81000, montant_ttc: 531000, montant_retenue: 22500, montant_net_a_payer: 508500, montant_paye: 508500, statut: 'payee', comptabilisee: true, description: 'Abonnement téléphonique + internet — Avril 2026', created_at: '2026-04-15' },
];

export const MOCK_ECRITURES = [
  {
    id: 'ec1', journal: 'VTE', date: '2026-05-01', numero: 'VTE-2026-0042', libelle: 'FCT-2026-0001 — Sonatel SA',
    lignes: [
      { compte: '411001', libelle: 'Client Sonatel SA', debit: 5900000, credit: 0 },
      { compte: '706', libelle: 'Prestations de services', debit: 0, credit: 5000000 },
      { compte: '4432', libelle: 'TVA collectée 18%', debit: 0, credit: 900000 },
    ]
  },
  {
    id: 'ec2', journal: 'ACH', date: '2026-05-02', numero: 'ACH-2026-0038', libelle: 'ACH-2026-0003 — AWS Africa',
    lignes: [
      { compte: '624', libelle: 'Services cloud AWS', debit: 1250000, credit: 0 },
      { compte: '4441', libelle: 'TVA récupérable', debit: 0, credit: 0 },
      { compte: '401003', libelle: 'Fournisseur AWS Africa', debit: 0, credit: 1000000 },
      { compte: '4435', libelle: 'Retenue à la source 20%', debit: 0, credit: 250000 },
    ]
  },
  {
    id: 'ec3', journal: 'BNQ', date: '2026-05-03', numero: 'BNQ-2026-0015', libelle: 'Règlement FCT-2026-0001',
    lignes: [
      { compte: '521', libelle: 'CBAO — Virement reçu', debit: 5900000, credit: 0 },
      { compte: '411001', libelle: 'Solde client Sonatel', debit: 0, credit: 5900000 },
    ]
  },
  {
    id: 'ec4', journal: 'VTE', date: '2026-05-04', numero: 'VTE-2026-0043', libelle: 'FCT-2026-0002 — CBAO',
    lignes: [
      { compte: '411003', libelle: 'Client CBAO', debit: 8407500, credit: 0 },
      { compte: '706', libelle: 'Prestations de services', debit: 0, credit: 7125000 },
      { compte: '4432', libelle: 'TVA collectée 18%', debit: 0, credit: 1282500 },
    ]
  },
  {
    id: 'ec5', journal: 'OD', date: '2026-05-05', numero: 'OD-2026-0008', libelle: 'Dotation amortissement Matos info',
    lignes: [
      { compte: '681', libelle: 'DAP — Amortissement matériel', debit: 125000, credit: 0 },
      { compte: '284', libelle: 'Amort. matériel informatique', debit: 0, credit: 125000 },
    ]
  },
];

export const MOCK_EMPLOYES: Employe[] = [
  { id: 'emp1', entreprise_id: '1', matricule: 'EMP-001', nom: 'Sow', prenom: 'Aminata', email: 'a.sow@omadigital.sn', telephone: '+221 77 123 11 22', nationalite: 'Sénégalaise', numero_ipres: 'SN-IPRES-0012345', numero_css: 'SN-CSS-0012345', type_contrat: 'cdi', date_embauche: '2023-01-01', poste: 'Directrice Financière', departement: 'Finance', statut: 'actif', salaire_base: 650000, categorie_ipres: 'cadre', est_cadre: true, banque: 'CBAO', created_at: '2023-01-01' },
  { id: 'emp2', entreprise_id: '1', matricule: 'EMP-002', nom: 'Ndiaye', prenom: 'Moussa', email: 'm.ndiaye@omadigital.sn', telephone: '+221 77 234 22 33', nationalite: 'Sénégalaise', numero_ipres: 'SN-IPRES-0023456', numero_css: 'SN-CSS-0023456', type_contrat: 'cdi', date_embauche: '2023-06-01', poste: 'Développeur Full Stack', departement: 'Tech', statut: 'actif', salaire_base: 480000, categorie_ipres: 'general', est_cadre: false, banque: 'BIS', created_at: '2023-06-01' },
  { id: 'emp3', entreprise_id: '1', matricule: 'EMP-003', nom: 'Ba', prenom: 'Fatou', email: 'f.ba@omadigital.sn', telephone: '+221 77 345 33 44', nationalite: 'Sénégalaise', numero_ipres: 'SN-IPRES-0034567', numero_css: 'SN-CSS-0034567', type_contrat: 'cdd', date_embauche: '2024-01-15', date_fin_contrat: '2025-01-14', poste: 'Chargée de Communication', departement: 'Marketing', statut: 'actif', salaire_base: 320000, categorie_ipres: 'general', est_cadre: false, banque: 'SGBS', created_at: '2024-01-15' },
  { id: 'emp4', entreprise_id: '1', matricule: 'EMP-004', nom: 'Diallo', prenom: 'Ibrahima', email: 'i.diallo@omadigital.sn', telephone: '+221 77 456 44 55', nationalite: 'Sénégalaise', type_contrat: 'stage', date_embauche: '2026-01-01', date_fin_contrat: '2026-06-30', poste: 'Stagiaire Dev Mobile', departement: 'Tech', statut: 'actif', salaire_base: 120000, categorie_ipres: 'general', est_cadre: false, created_at: '2026-01-01' },
];

export const MOCK_MOUVEMENTS_BANCAIRES = [
  { id: 'mb1', compte_id: 'b1', date: '2026-05-01', libelle: 'Virement reçu — Sonatel SA', reference: 'VIR-SON-001', type: 'credit', montant: 5900000, solde_apres: 18450000 },
  { id: 'mb2', compte_id: 'b1', date: '2026-05-02', libelle: 'Règlement fournisseur IGD', reference: 'VIR-IGD-002', type: 'debit', montant: 1003000, solde_apres: 17447000 },
  { id: 'mb3', compte_id: 'b1', date: '2026-05-03', libelle: 'Frais bancaires Avril', reference: 'FB-2026-04', type: 'debit', montant: 12500, solde_apres: 17434500 },
  { id: 'mb4', compte_id: 'b1', date: '2026-05-04', libelle: 'Virement paie Avril 2026', reference: 'PAIE-APR-2026', type: 'debit', montant: 1570000, solde_apres: 15864500 },
  { id: 'mb5', compte_id: 'b1', date: '2026-05-05', libelle: 'Règlement client TSP', reference: 'VIR-TSP-003', type: 'credit', montant: 2585500, solde_apres: 18450000 },
];
