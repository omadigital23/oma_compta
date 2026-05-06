/**
 * Utilitaires de formatage monétaire FCFA (XOF)
 * Le FCFA n'a pas de centimes — tous les montants sont des entiers.
 */

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function parseFCFA(value: string): number {
  const cleaned = value.replace(/[^\d-]/g, '');
  return parseInt(cleaned, 10) || 0;
}

export function formatCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)} Mrd`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)} K`;
  }
  return formatNumber(amount);
}

export function montantEnLettres(montant: number): string {
  const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const dizaines = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
  const ados = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];

  if (montant === 0) return 'zéro franc CFA';

  function convertGroup(n: number): string {
    if (n === 0) return '';
    if (n < 10) return unites[n];
    if (n < 20) return ados[n - 10];
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (d === 7 || d === 9) {
      return dizaines[d] + '-' + ados[u];
    }
    if (u === 0) return dizaines[d] + (d === 8 ? 's' : '');
    if (u === 1 && d !== 8) return dizaines[d] + ' et un';
    return dizaines[d] + '-' + unites[u];
  }

  function convert(n: number): string {
    if (n === 0) return '';
    if (n < 100) return convertGroup(n);
    const c = Math.floor(n / 100);
    const rest = n % 100;
    let result = c === 1 ? 'cent' : unites[c] + ' cent';
    if (rest === 0 && c > 1) result += 's';
    else if (rest > 0) result += ' ' + convertGroup(rest);
    return result;
  }

  const milliards = Math.floor(montant / 1_000_000_000);
  const millions = Math.floor((montant % 1_000_000_000) / 1_000_000);
  const mille = Math.floor((montant % 1_000_000) / 1_000);
  const reste = montant % 1_000;

  let result = '';
  if (milliards > 0) result += convert(milliards) + ' milliard' + (milliards > 1 ? 's' : '') + ' ';
  if (millions > 0) result += convert(millions) + ' million' + (millions > 1 ? 's' : '') + ' ';
  if (mille > 0) result += (mille === 1 ? 'mille' : convert(mille) + ' mille') + ' ';
  if (reste > 0) result += convert(reste);

  return result.trim() + ' francs CFA';
}
