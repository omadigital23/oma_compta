'use client';

import { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CLASSES_COMPTABLES, rechercherCompte, getComptesParClasse } from '@/lib/accounting/plan-comptable';

export default function PlanComptablePage() {
  const [search, setSearch] = useState('');
  const [classeOuverte, setClasseOuverte] = useState<number | null>(null);

  const resultats = search ? rechercherCompte(search) : [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Plan comptable</h1>
        <p className="text-sm text-muted-foreground mt-1">SYSCOHADA Révisé — 9 classes de comptes</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par numéro ou intitulé (ex: 411, clients...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl h-11 bg-white"
        />
      </div>

      {/* Search results */}
      {search && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-muted/30 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground">{resultats.length} résultat(s) pour &quot;{search}&quot;</p>
          </div>
          <div className="divide-y divide-border/50">
            {resultats.map((c, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-money text-[#1B4332] w-16">{c.numero}</span>
                  <span className="text-sm text-foreground">{c.intitule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{c.type_compte}</Badge>
                  <Badge variant="secondary" className="text-[10px]">Classe {c.classe}</Badge>
                </div>
              </div>
            ))}
            {resultats.length === 0 && <p className="px-5 py-6 text-sm text-muted-foreground text-center">Aucun compte trouvé</p>}
          </div>
        </div>
      )}

      {/* Classes accordion */}
      {!search && (
        <div className="space-y-3 stagger-children">
          {CLASSES_COMPTABLES.map((classe) => {
            const comptes = getComptesParClasse(classe.numero);
            const isOpen = classeOuverte === classe.numero;

            return (
              <div key={classe.numero} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:shadow-black/5 transition-all duration-300">
                <button
                  onClick={() => setClasseOuverte(isOpen ? null : classe.numero)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${classe.couleur}15` }}>
                      <span className="text-lg font-bold font-money" style={{ color: classe.couleur }}>{classe.numero}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Classe {classe.numero}</h3>
                      <p className="text-xs text-muted-foreground">{classe.intitule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-[10px]">{comptes.length} comptes</Badge>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-border divide-y divide-border/50 animate-fade-in-up">
                    {comptes.map((c, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold font-money w-16" style={{ color: classe.couleur }}>{c.numero}</span>
                          <span className="text-sm text-foreground">{c.intitule}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize">{c.type_compte}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
