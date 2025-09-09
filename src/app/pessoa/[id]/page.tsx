"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  FileText,
  Download,
  Plus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { PessoaDTO } from "@/lib/types";
import {
  formatarData,
  obterStatusPessoa,
  tempoDesaparecido,
  formatarTelefone,
} from "@/utils/formatters";
import InformationForm from "@/components/InformationForm";

export default function PersonDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [pessoa, setPessoa] = useState<PessoaDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const pessoaId = parseInt(params.id as string);

  useEffect(() => {
    if (pessoaId) {
      carregarPessoa();
    }
  }, [pessoaId]);

  const carregarPessoa = async () => {
    try {
      setLoading(true);
      setErro(null);

      const pessoaData = await api.buscarPessoaPorId(pessoaId);
      setPessoa(pessoaData);
    } catch (error) {
      console.error("Erro ao carregar pessoa:", error);
      setErro("Pessoa não encontrada ou erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleInformacaoEnviada = () => {
    setMostrarFormulario(false);
    // Poderia recarregar os dados da pessoa aqui se necessário
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loading-spinner w-8 h-8" />
        <span className="ml-3 text-gray-600">Carregando detalhes...</span>
      </div>
    );
  }

  if (erro || !pessoa) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Pessoa não encontrada
        </h2>
        <p className="text-gray-600 mb-6">{erro}</p>
        <Link href="/" className="btn-primary">
          Voltar à busca
        </Link>
      </div>
    );
  }

  const statusInfo = obterStatusPessoa(pessoa);

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão voltar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{pessoa.nome}</h1>
          <div
            className={`inline-flex items-center gap-2 status-badge ${statusInfo.cor} mt-2`}
          >
            {statusInfo.status === "LOCALIZADO" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {statusInfo.texto}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal - Informações */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações básicas */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações Pessoais
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <p className="mt-1 text-sm text-gray-900">{pessoa.nome}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Idade
                </label>
                <p className="mt-1 text-sm text-gray-900">{pessoa.idade}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sexo
                </label>
                <p className="mt-1 text-sm text-gray-900">{pessoa.sexo}</p>
              </div>
            </div>
          </div>

          {/* Informações do desaparecimento */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Caso
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Data do Desaparecimento
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}
                  </p>
                  {statusInfo.status === "DESAPARECIDO" && (
                    <p className="text-xs text-red-600 mt-1">
                      Há{" "}
                      {tempoDesaparecido(
                        pessoa.ultimaOcorrencia?.dtDesaparecimento
                      )}
                    </p>
                  )}
                </div>
              </div>

              {statusInfo.status === "LOCALIZADO" &&
                pessoa.ultimaOcorrencia?.dataLocalizacao && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Vestimentas
                      </p>
                      <p className="text-sm text-gray-900">
                        {
                          pessoa.ultimaOcorrencia.ocorrenciaFrequesaDisparo
                            .vestimentasDesaparecido
                        }
                      </p>
                    </div>
                  </div>
                )}

              {pessoa.ultimaOcorrencia?.ocorrenciaFrequesaDisparo
                ?.informacao && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Informações Adicionais
                    </p>
                    <p className="text-sm text-gray-900">
                      {
                        pessoa.ultimaOcorrencia.ocorrenciaFrequesaDisparo
                          .informacao
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentos */}
          {pessoa.ultimaOcorrencia?.listaCartaz &&
            pessoa.ultimaOcorrencia.listaCartaz.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Documentos Disponíveis
                </h2>

                <div className="space-y-3">
                  {pessoa.ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          Documento oficial - {cartaz.tipoCartaz}
                        </span>
                      </div>
                      <a
                        href={cartaz.urlCartaz}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2 text-xs"
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Botão para adicionar informação */}
          {statusInfo.status === "DESAPARECIDO" && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tem informações sobre esta pessoa?
              </h2>
              <p className="text-gray-600 mb-4">
                Se você tem informações que podem ajudar na localização desta
                pessoa, compartilhe conosco. Sua contribuição pode fazer a
                diferença.
              </p>
              <button
                onClick={() => setMostrarFormulario(true)}
                className="btn-success flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Enviar Informação
              </button>
            </div>
          )}
        </div>

        {/* Coluna lateral - Foto */}
        <div className="space-y-6">
          <div className="card overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100">
              {pessoa.urlFoto ? (
                <Image
                  src={pessoa.urlFoto}
                  alt={`Foto de ${pessoa.nome}`}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : null}

              <div
                className={`w-full h-full flex flex-col items-center justify-center bg-gray-200 ${
                  pessoa.urlFoto ? "hidden" : ""
                }`}
              >
                <User className="w-24 h-24 text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm">Foto não disponível</p>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {pessoa.nome}
              </h3>
              <p className="text-sm text-gray-600">
                {pessoa.idade} • {pessoa.sexo}
              </p>
            </div>
          </div>

          {/* Informações de contato de emergência */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Em caso de informações
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Central: </span>
                <a
                  href="tel:08006477900"
                  className="text-blue-600 hover:text-blue-800"
                >
                  0800 647 7900
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Geral: </span>
                <a
                  href="tel:6536137900"
                  className="text-blue-600 hover:text-blue-800"
                >
                  (65) 3613-7900
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do formulário */}
      {mostrarFormulario && (
        <InformationForm
          pessoaId={pessoaId}
          ocorrenciaId={pessoa.ultimaOcorrencia.ocoId} // <-- LINHA CORRIGIDA
          onClose={() => setMostrarFormulario(false)}
          onSuccess={handleInformacaoEnviada}
        />
      )}
    </div>
  );
}
