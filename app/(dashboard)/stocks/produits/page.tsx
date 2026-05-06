'use client';

import { useState } from 'react';
import { AlertTriangle, Boxes, PackagePlus, Plus, Search, ShoppingCart, Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ARTICLES, MOCK_MOUVEMENTS_STOCK } from '@/lib/mock-data-phase3';
import { formatDate } from '@/lib/utils/dates';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

const typeLabels = {
  service: 'Service',
  produit: 'Produit',
  fourniture: 'Fourniture',
};

export default function ProduitsPage() {
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState<'tous' | 'service' | 'produit' | 'fourniture'>('tous');

  const articles = MOCK_ARTICLES.filter((article) => {
    const q = search.toLowerCase();
    if (filtre !== 'tous' && article.type !== filtre) return false;
    return !q || article.designation.toLowerCase().includes(q) || (article.reference || '').toLowerCase().includes(q);
  });

  const articlesStockes = MOCK_ARTICLES.filter((article) => article.stock_minimum > 0);
  const alertesStock = articlesStockes.filter((article) => article.stock_actuel <= article.stock_minimum);
  const valeurStock = MOCK_ARTICLES.reduce((sum, article) => sum + article.stock_actuel * article.prix_achat_ht, 0);
  const caPotentiel = MOCK_ARTICLES.reduce((sum, article) => sum + article.stock_actuel * article.prix_vente_ht, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Articles & services</h1>
          <p className="text-sm text-muted-foreground mt-1">Catalogue, comptes SYSCOHADA, TVA et suivi stock minimum.</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouvel article
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Articles actifs', value: String(MOCK_ARTICLES.length), icon: Tags, color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Valeur stock', value: formatFCFA(valeurStock), icon: Boxes, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'CA potentiel', value: formatFCFA(caPotentiel), icon: ShoppingCart, color: 'text-foreground', bg: 'bg-gray-100' },
          { label: 'Alertes stock', value: String(alertesStock.length), icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', metric.bg)}>
                <metric.icon className={cn('w-3.5 h-3.5', metric.color)} />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className={cn('text-lg font-bold font-money', metric.color)}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-white border border-border rounded-xl p-1 gap-0.5">
          {[
            ['tous', 'Tous'],
            ['service', 'Services'],
            ['produit', 'Produits'],
            ['fourniture', 'Fournitures'],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFiltre(value as typeof filtre)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filtre === value ? 'bg-[#1B4332] text-white shadow-sm' : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Reference', 'Designation', 'Type', 'Vente HT', 'TVA', 'Stock', 'Comptes'].map((header) => (
                    <th key={header} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => {
                  const stockAlerte = article.stock_minimum > 0 && article.stock_actuel <= article.stock_minimum;
                  return (
                    <tr key={article.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-bold text-[#1B4332] font-mono">{article.reference}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-foreground">{article.designation}</p>
                        <p className="text-[11px] text-muted-foreground">Unite : {article.unite}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant="secondary" className="text-[11px] rounded-full">{typeLabels[article.type]}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold font-money text-foreground">{formatFCFA(article.prix_vente_ht)}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{article.taux_tva}%</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={cn('text-sm font-bold', stockAlerte ? 'text-amber-700' : 'text-foreground')}>{article.stock_actuel}</span>
                          {stockAlerte && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                        </div>
                        {article.stock_minimum > 0 && <p className="text-[11px] text-muted-foreground">min. {article.stock_minimum}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">
                        V {article.compte_vente} / A {article.compte_achat}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <PackagePlus className="w-4 h-4 text-[#1B4332]" />
            <h3 className="text-sm font-bold text-foreground">Derniers mouvements</h3>
          </div>
          <div className="divide-y divide-border/50">
            {MOCK_MOUVEMENTS_STOCK.map((mouvement) => {
              const article = MOCK_ARTICLES.find((item) => item.id === mouvement.article_id);
              return (
                <div key={mouvement.id} className="px-5 py-3.5 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{article?.designation}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(mouvement.date)} - {mouvement.reference}</p>
                    </div>
                    <span className={cn('text-xs font-bold px-2 py-1 rounded-full', mouvement.type === 'entree' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')}>
                      {mouvement.type === 'entree' ? '+' : '-'}{mouvement.quantite}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground font-money">CMUP : {formatFCFA(mouvement.cout_unitaire)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
