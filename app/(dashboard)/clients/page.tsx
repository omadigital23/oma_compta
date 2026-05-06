'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Download, Mail, Phone, MapPin, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_CLIENTS } from '@/lib/mock-data';
import { formatFCFA } from '@/lib/utils/fcfa';
import { cn } from '@/lib/utils';

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const clients = MOCK_CLIENTS.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    (c.raison_sociale || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">{MOCK_CLIENTS.length} clients enregistrés</p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white gap-2 rounded-xl shadow-lg shadow-[#1B4332]/20">
          <Plus className="w-4 h-4" />
          Nouveau client
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm transition-all outline-none"
          />
        </div>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Filter className="w-4 h-4" /> Filtrer
        </Button>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Download className="w-4 h-4" /> Exporter
        </Button>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
        {clients.map((client) => (
          <Link key={client.id} href={`/clients/${client.id}`}>
            <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                    client.type === 'entreprise' ? 'bg-[#1B4332]/10' : 'bg-amber-50'
                  )}>
                    {client.type === 'entreprise'
                      ? <Building2 className="w-5 h-5 text-[#1B4332]" />
                      : <User className="w-5 h-5 text-amber-600" />
                    }
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-[#1B4332] transition-colors">
                      {client.nom} {client.prenom || ''}
                    </h3>
                    {client.raison_sociale && (
                      <p className="text-xs text-muted-foreground">{client.raison_sociale}</p>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {client.type === 'entreprise' ? 'Entreprise' : 'Particulier'}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                {client.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {client.telephone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{client.telephone}</span>
                  </div>
                )}
                {client.ville && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{client.ville}, {client.pays}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Facturé</p>
                  <p className="text-sm font-bold font-money text-foreground">{formatFCFA(client.total_facture || 0)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Solde dû</p>
                  <p className={cn(
                    'text-sm font-bold font-money',
                    (client.solde || 0) > 0 ? 'text-amber-600' : 'text-emerald-600'
                  )}>
                    {formatFCFA(client.solde || 0)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
