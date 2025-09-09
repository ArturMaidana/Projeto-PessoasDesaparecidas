"use client";

import { useState, useEffect } from "react";
import { Star, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { PessoaDTO } from "@/lib/types";
import PersonCard from "./PersonCard";

export default function FeaturedPersons() {
  const [pessoasDestaque, setPessoasDestaque] = useState<PessoaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarPessoasDestaque = async () => {
    try {
      setLoading(true);
      const pessoas = await api.buscarPessoasAleatorias(4);
      setPessoasDestaque(pessoas);
    } catch (error) {
      console.error("Erro ao carregar pessoas em destaque:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPessoasDestaque();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner w-6 h-6" />
          <span className="ml-3 text-gray-600">
            Carregando pessoas em destaque...
          </span>
        </div>
      </div>
    );
  }

  if (pessoasDestaque.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            Casos em Destaque
          </h2>
        </div>
        <button
          onClick={carregarPessoasDestaque}
          className="btn-secondary flex items-center gap-2 text-sm"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pessoasDestaque.map((pessoa) => (
          <PersonCard key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Casos selecionados aleatoriamente com fotos disponíveis
        </p>
      </div>
    </div>
  );
}
