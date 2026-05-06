'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CA_MENSUEL } from '@/lib/mock-data';
import { formatFCFA, formatCompact } from '@/lib/utils/fcfa';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-xl p-3 min-w-[180px]">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name === 'ca' ? 'CA' : 'Dépenses'}</span>
          </div>
          <span className="font-money font-semibold">{formatFCFA(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function CAChart() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-heading)]">
            Chiffre d&apos;affaires vs Dépenses
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">12 derniers mois (FCFA)</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1B4332]" />
            <span className="text-muted-foreground">CA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />
            <span className="text-muted-foreground">Dépenses</span>
          </div>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CA_MENSUEL} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B4332" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#1B4332" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradDep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e4e0" vertical={false} />
            <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(v) => formatCompact(v)} dx={-4} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ca" stroke="#1B4332" strokeWidth={2.5} fill="url(#gradCA)" name="ca" dot={false} activeDot={{ r: 5, fill: '#1B4332', stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="depenses" stroke="#C9A84C" strokeWidth={2} fill="url(#gradDep)" name="depenses" dot={false} activeDot={{ r: 4, fill: '#C9A84C', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
