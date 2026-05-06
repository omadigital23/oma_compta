import { Construction } from 'lucide-react';

interface ComingSoonProps {
  titre: string;
  description: string;
  module: string;
}

export default function ComingSoon({ titre, description, module }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1B4332]/10 to-[#C9A84C]/10 flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-[#1B4332]" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">{titre}</h2>
      <p className="text-muted-foreground max-w-md mb-4">{description}</p>
      <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
        Module {module} — En développement
      </span>
    </div>
  );
}
