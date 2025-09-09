"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  totalElementos: number;
  onPageChange: (pagina: number) => void;
  loading?: boolean;
}

export default function Pagination({
  paginaAtual,
  totalPaginas,
  totalElementos,
  onPageChange,
  loading,
}: PaginationProps) {
  if (totalPaginas <= 1) return null;

  const gerarNumerosPaginas = () => {
    const paginas: (number | string)[] = [];
    const maxPaginas = 7;

    if (totalPaginas <= maxPaginas) {
      for (let i = 0; i < totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (paginaAtual <= 3) {
        for (let i = 0; i < 5; i++) {
          paginas.push(i);
        }
        paginas.push("...");
        paginas.push(totalPaginas - 1);
      } else if (paginaAtual >= totalPaginas - 4) {
        paginas.push(0);
        paginas.push("...");
        for (let i = totalPaginas - 5; i < totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(0);
        paginas.push("...");
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
          paginas.push(i);
        }
        paginas.push("...");
        paginas.push(totalPaginas - 1);
      }
    }

    return paginas;
  };

  const numerosPaginas = gerarNumerosPaginas();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Informações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{paginaAtual * 10 + 1}</span>{" "}
          a{" "}
          <span className="font-medium">
            {Math.min((paginaAtual + 1) * 10, totalElementos)}
          </span>{" "}
          de <span className="font-medium">{totalElementos}</span> resultados
        </div>

        {/* Controles de paginação */}
        <div className="flex items-center gap-2">
          {/* Botão anterior */}
          <button
            onClick={() => onPageChange(paginaAtual - 1)}
            disabled={paginaAtual === 0 || loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Números das páginas */}
          <div className="flex items-center gap-1">
            {numerosPaginas.map((pagina, index) => (
              <div key={index}>
                {pagina === "..." ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pagina as number)}
                    disabled={loading}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      disabled:cursor-not-allowed
                      ${
                        pagina === paginaAtual
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {(pagina as number) + 1}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Botão próximo */}
          <button
            onClick={() => onPageChange(paginaAtual + 1)}
            disabled={paginaAtual >= totalPaginas - 1 || loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
