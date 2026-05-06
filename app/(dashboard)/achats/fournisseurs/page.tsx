'use client';

import { useState } from 'react';
import { Plus, Search, Building2, User, Mail, Phone, MapPin, AlertTriangle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_FOURNISSEURS } from '@/lib/mock-data-phase2';
import { cn } from '@/lib/utils';

export default function FournisseursPage() {
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState<'tous' | 'local' | 'etranger'>('tous');

  const fournisseurs = MOCK_FOURNISSEURS.filter(f => {
    const q = search.toLowerCase();
    if (q && !f.nom.toLowerCase().includes(q) && !(f.raison_sociale || '').toLowerCase().includes(q)) return false;
    if (filtre === 'local' && f.est_etranger) return false;
    if (filtre === 'etranger' && !f.est_etranger) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Fournisseurs</h1>
          <p className="text-sm text-muted-foreground mt-1">{MOCK_FOURNISSEURS.length} fournisseurs enregistrés</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" /> Nouveau fournisseur
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary/30 transition-colors" />
        </div>
        <div className="flex items-center bg-white border border-border rounded-xl p-1 gap-0.5">
          {(['tous', 'local', 'etranger'] as const).map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                filtre === f ? 'bg-[#1B4332] text-white' : 'text-muted-foreground hover:bg-muted/50')}>
              {f === 'etranger' ? 'Étrangers' : f === 'local' ? 'Locaux' : 'Tous'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
        {fournisseurs.map(f => (
          <div key={f.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                  f.est_etranger ? 'bg-purple-50' : f.type === 'entreprise' ? 'bg-[#1B4332]/10' : 'bg-amber-50')}>
                  {f.est_etranger ? <Globe className="w-5 h-5 text-purple-600" />
                    : f.type === 'entreprise' ? <Building2 className="w-5 h-5 text-[#1B4332]" />
                    : <User className="w-5 h-5 text-amber-600" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-[#1B4332] transition-colors">{f.nom}</h3>
                  {f.raison_sociale && <p className="text-xs text-muted-foreground">{f.raison_sociale}</p>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {f.est_etranger && (
                  <Badge className="text-[10px] bg-purple-50 text-purple-700 border-purple-200 border rounded-full px-2">
                    Étranger
                  </Badge>
                )}
                {f.taux_retenue > 0 && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-2.5 h-2.5" /> Ret. {f.taux_retenue}%
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
              {f.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /><span className="truncate">{f.email}</span></div>}
              {f.telephone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>{f.telephone}</span></div>}
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>{f.ville}, {f.pays}</span></div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
              <div>
                <p className="text-muted-foreground">Compte</p>
                <p className="font-mono font-bold text-foreground">{f.compte_comptable}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Délai paiement</p>
                <p className="font-semibold text-foreground">{f.delai_paiement} jours</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Devise</p>
                <p className="font-semibold text-foreground">{f.devise}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
