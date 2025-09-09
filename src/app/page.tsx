"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, AlertTriangle } from "lucide-react";
import { api } from "@/lib/api";
import {
  PessoaDTO,
  PessoaFiltro,
  PagePessoaDTO,
  EstatisticaPessoaDTO,
} from "@/lib/types";
import SearchFilters from "@/components/SearchFilters";
import PersonCard from "@/components/PersonCard";
import Pagination from "@/components/Pagination";
import FeaturedPersons from "@/components/FeaturedPersons";

export default function HomePage() {
  const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
  const [paginacao, setPaginacao] = useState({
    paginaAtual: 0,
    totalPaginas: 0,
    totalElementos: 0,
    tamanhoPagina: 10,
  });
  const [estatisticas, setEstatisticas] = useState<EstatisticaPessoaDTO | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtrosAtivos, setFiltrosAtivos] = useState<PessoaFiltro>({});

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
    carregarEstatisticas();
  }, []);

  const carregarDados = async (filtros: PessoaFiltro = {}) => {
    try {
      setLoading(true);
      setErro(null);

      const response = await api.buscarPessoas({
        ...filtros,
        porPagina: 10,
      });

      setPessoas(response.content || []);
      setPaginacao({
        paginaAtual: response.number || 0,
        totalPaginas: response.totalPages || 0,
        totalElementos: response.totalElements || 0,
        tamanhoPagina: response.size || 10,
      });
      setFiltrosAtivos(filtros);
    } catch (error) {
      console.error("Erro ao carregar pessoas:", error);
      setErro("Erro ao carregar dados. Tente novamente.");
      setPessoas([]);
    } finally {
      setLoading(false);
    }
  };

  const carregarEstatisticas = async () => {
    try {
      const stats = await api.buscarEstatisticas();
      setEstatisticas(stats);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const handleFiltrar = (novosFiltros: PessoaFiltro) => {
    carregarDados(novosFiltros);
  };

  const handleMudarPagina = (novaPagina: number) => {
    carregarDados({
      ...filtrosAtivos,
      pagina: novaPagina,
    });
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      {estatisticas && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {estatisticas.quantPessoasDesaparecidas}
                </p>
                <p className="text-sm text-gray-600">Pessoas Desaparecidas</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {estatisticas.quantPessoasEncontradas}
                </p>
                <p className="text-sm text-gray-600">Pessoas Encontradas</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {estatisticas.quantPessoasDesaparecidas +
                    estatisticas.quantPessoasEncontradas}
                </p>
                <p className="text-sm text-gray-600">Total de Registros</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros de busca */}
      <SearchFilters onFilter={handleFiltrar} loading={loading} />

      {/* Pessoas em destaque - apenas se não há filtros ativos */}
      {!loading && !erro && Object.keys(filtrosAtivos).length === 0 && (
        <FeaturedPersons />
      )}

      {/* Resultados */}
      <div className="space-y-6">
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Erro</p>
            </div>
            <p className="text-red-700 mt-2">{erro}</p>
            <button
              onClick={() => carregarDados(filtrosAtivos)}
              className="btn-primary mt-3"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="loading-spinner w-8 h-8" />
            <span className="ml-3 text-gray-600">Carregando...</span>
          </div>
        )}

        {!loading && !erro && pessoas.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma pessoa encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca para encontrar resultados.
            </p>
          </div>
        )}

        {!loading && !erro && pessoas.length > 0 && (
          <>
            {/* Grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pessoas.map((pessoa) => (
                <PersonCard key={pessoa.id} pessoa={pessoa} />
              ))}
            </div>

            {/* Paginação */}
            <Pagination
              paginaAtual={paginacao.paginaAtual}
              totalPaginas={paginacao.totalPaginas}
              totalElementos={paginacao.totalElementos}
              onPageChange={handleMudarPagina}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}
