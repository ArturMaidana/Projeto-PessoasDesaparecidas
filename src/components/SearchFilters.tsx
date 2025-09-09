"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { PessoaFiltro } from "../lib/types";

interface SearchFiltersProps {
  onFilter: (filtros: PessoaFiltro) => void;
  loading?: boolean;
}

export default function SearchFilters({
  onFilter,
  loading,
}: SearchFiltersProps) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState<PessoaFiltro>({
    nome: "",
    faixaEtariaInicial: undefined,
    faixaEtariaFinal: undefined,
    sexo: undefined,
    status: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove campos vazios
    const filtrosLimpos = Object.fromEntries(
      Object.entries(filtros).filter(
        ([_, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    onFilter({ ...filtrosLimpos, pagina: 0 });
  };

  const limparFiltros = () => {
    const filtrosVazios = {
      nome: "",
      faixaEtariaInicial: undefined,
      faixaEtariaFinal: undefined,
      sexo: undefined,
      status: undefined,
    };
    setFiltros(filtrosVazios);
    onFilter({ pagina: 0 });
  };

  const temFiltrosAtivos = Object.values(filtros).some(
    (value) => value !== "" && value !== undefined && value !== null
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Busca por nome */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Buscar por nome
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="nome"
                type="text"
                placeholder="Digite o nome da pessoa..."
                className="input-field pl-10"
                value={filtros.nome}
                onChange={(e) =>
                  setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="btn-secondary flex items-center gap-2 whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              {mostrarFiltros ? "Ocultar Filtros" : "Mais Filtros"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {loading ? (
                <div className="loading-spinner w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Buscar
            </button>
          </div>
        </div>

        {/* Filtros avançados */}
        {mostrarFiltros && (
          <div className="border-t border-gray-200 pt-4 space-y-4 animation-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Faixa etária */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade mínima
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Ex: 18"
                  className="input-field"
                  value={filtros.faixaEtariaInicial || ""}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      faixaEtariaInicial: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade máxima
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Ex: 65"
                  className="input-field"
                  value={filtros.faixaEtariaFinal || ""}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      faixaEtariaFinal: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo
                </label>
                <select
                  className="input-field"
                  value={filtros.sexo || ""}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      sexo: e.target.value as
                        | "MASCULINO"
                        | "FEMININO"
                        | undefined,
                    }))
                  }
                >
                  <option value="">Todos</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="input-field"
                  value={filtros.status || ""}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      status: e.target.value as
                        | "DESAPARECIDO"
                        | "LOCALIZADO"
                        | undefined,
                    }))
                  }
                >
                  <option value="">Todos</option>
                  <option value="DESAPARECIDO">Desaparecido</option>
                  <option value="LOCALIZADO">Localizado</option>
                </select>
              </div>
            </div>

            {/* Botão limpar filtros */}
            {temFiltrosAtivos && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="btn-secondary flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
