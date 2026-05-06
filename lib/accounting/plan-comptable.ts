import { CompteComptable } from '@/types/comptabilite';

export const PLAN_COMPTABLE_SYSCOHADA: Omit<CompteComptable, 'id' | 'entreprise_id'>[] = [
  { numero: '101', intitule: 'Capital social', classe: 1, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '111', intitule: 'Réserve légale', classe: 1, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '12', intitule: 'Report à nouveau', classe: 1, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '13', intitule: "Résultat net de l'exercice", classe: 1, type_compte: 'mixte', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '16', intitule: 'Emprunts et dettes assimilées', classe: 1, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '19', intitule: 'Provisions pour risques et charges', classe: 1, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '21', intitule: 'Immobilisations incorporelles', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '22', intitule: 'Terrains', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '231', intitule: 'Bâtiments', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '244', intitule: 'Matériel de bureau et informatique', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '247', intitule: 'Matériel de transport', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '281', intitule: 'Amort. immobilisations incorporelles', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '284', intitule: 'Amort. matériel', classe: 2, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '31', intitule: 'Marchandises', classe: 3, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '32', intitule: 'Matières premières', classe: 3, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '401', intitule: 'Fournisseurs', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '411', intitule: 'Clients', classe: 4, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '422', intitule: 'Personnel, rémunérations dues', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '431', intitule: 'Sécurité sociale (IPRES, CSS)', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '441', intitule: 'État, impôt sur bénéfice (IS)', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '4431', intitule: 'TVA facturée sur ventes', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '4432', intitule: 'TVA facturée sur prestations', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '4441', intitule: 'TVA récupérable sur achats', classe: 4, type_compte: 'actif', nature: 'bilan', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '445', intitule: 'État, taxes à payer', classe: 4, type_compte: 'passif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '521', intitule: 'Banques locales', classe: 5, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '571', intitule: 'Caisse', classe: 5, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '581', intitule: 'Mobile money (Wave, Orange, Free)', classe: 5, type_compte: 'actif', nature: 'bilan', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '601', intitule: 'Achats de marchandises', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '604', intitule: 'Achats de fournitures', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '624', intitule: 'Loyers et charges locatives', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '627', intitule: 'Télécommunications', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '641', intitule: 'Rémunération du personnel', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '681', intitule: 'Dotations aux amortissements', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '691', intitule: 'Impôt sur le résultat (IS)', classe: 6, type_compte: 'charge', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '701', intitule: 'Ventes de marchandises', classe: 7, type_compte: 'produit', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '706', intitule: 'Prestations de services', classe: 7, type_compte: 'produit', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '707', intitule: 'Produits accessoires', classe: 7, type_compte: 'produit', nature: 'gestion', tva_applicable: true, taux_tva: 18, compte_systeme: true, actif: true },
  { numero: '781', intitule: "Reprises d'amortissements", classe: 7, type_compte: 'produit', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '83', intitule: 'Charges HAO', classe: 8, type_compte: 'charge', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
  { numero: '84', intitule: 'Produits HAO', classe: 8, type_compte: 'produit', nature: 'gestion', tva_applicable: false, taux_tva: 0, compte_systeme: true, actif: true },
];

export const CLASSES_COMPTABLES = [
  { numero: 1, intitule: 'Comptes de ressources durables', couleur: '#6366F1' },
  { numero: 2, intitule: "Comptes d'actif immobilisé", couleur: '#8B5CF6' },
  { numero: 3, intitule: 'Comptes de stocks', couleur: '#EC4899' },
  { numero: 4, intitule: 'Comptes de tiers', couleur: '#F59E0B' },
  { numero: 5, intitule: 'Comptes de trésorerie', couleur: '#10B981' },
  { numero: 6, intitule: 'Comptes de charges', couleur: '#EF4444' },
  { numero: 7, intitule: 'Comptes de produits', couleur: '#3B82F6' },
  { numero: 8, intitule: 'Comptes HAO', couleur: '#6B7280' },
  { numero: 9, intitule: 'Comptabilité analytique', couleur: '#A855F7' },
];

export function rechercherCompte(query: string) {
  const q = query.toLowerCase();
  return PLAN_COMPTABLE_SYSCOHADA.filter(
    c => c.numero.includes(q) || c.intitule.toLowerCase().includes(q)
  );
}

export function getComptesParClasse(classe: number) {
  return PLAN_COMPTABLE_SYSCOHADA.filter(c => c.classe === classe);
}
