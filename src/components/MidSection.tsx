"use client";

import Image from "next/image";

interface MidSectionProps {
  estatisticas?: {
    quantPessoasDesaparecidas: number;
    quantPessoasEncontradas: number;
  };
}

export default function MidSection({ estatisticas }: MidSectionProps) {
  const totalCasos =
    (estatisticas?.quantPessoasDesaparecidas || 0) +
    (estatisticas?.quantPessoasEncontradas || 0);

  return (
    <div className="w-full bg-[#2A2A2A] py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Pessoas Desaparecidas - MT
        </h1>
        <p className="text-xl text-white leading-relaxed">
          Ajude-nos a encontrar pessoas desaparecidas no estado de Mato Grosso.
          Sua informação pode fazer a diferença.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Total de Casos */}
        <div className="stats-card">
          <Image
            width={32}
            height={32}
            alt="Total de Casos"
            src="/images/total-casos.svg"
            className="mx-auto mb-4"
          />
          <div className="stats-number">{totalCasos}</div>
          <div className="stats-label">Total de Casos</div>
        </div>

        {/* Pessoas Desaparecidas */}
        <div className="stats-card">
          <Image
            width={32}
            height={32}
            alt="Pessoas Desaparecidas"
            src="/images/pessoas-desaparecidas.svg"
            className="mx-auto mb-4"
          />
          <div className="stats-number">
            {estatisticas?.quantPessoasDesaparecidas || 0}
          </div>
          <div className="stats-label">Pessoas Desaparecidas</div>
        </div>

        {/* Pessoas Encontradas */}
        <div className="stats-card">
          <Image
            width={32}
            height={32}
            alt="Pessoas Encontradas"
            src="/images/pessoas-encontradas.svg"
            className="mx-auto mb-4"
          />
          <div className="stats-number">
            {estatisticas?.quantPessoasEncontradas || 0}
          </div>
          <div className="stats-label">Pessoas Encontradas</div>
        </div>
      </div>
    </div>
  );
}
