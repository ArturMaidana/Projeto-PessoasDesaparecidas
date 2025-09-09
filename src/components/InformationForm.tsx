"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Upload,
  MapPin,
  Calendar,
  FileText,
  Send,
  AlertCircle,
} from "lucide-react";
import InputMask from "react-input-mask";
import { api } from "@/lib/api";

import { InformacaoFormData } from "@/lib/types";

const MaskedInput = InputMask as unknown as React.FC<any>;

const informacaoSchema = z.object({
  informacao: z
    .string()
    .min(10, "Informação deve ter pelo menos 10 caracteres"),
  descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  data: z.string().min(1, "Data é obrigatória"),
  localizacao: z.string().optional(),
  telefone: z.string().optional(),
});

type InformacaoForm = z.infer<typeof informacaoSchema>;

interface InformationFormProps {
  pessoaId: number;
  ocorrenciaId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InformationForm({
  pessoaId,
  ocorrenciaId,
  onClose,
  onSuccess,
}: InformationFormProps) {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InformacaoForm>({
    resolver: zodResolver(informacaoSchema),
    defaultValues: {
      data: new Date().toISOString().split("T")[0],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novosArquivos = Array.from(e.target.files);
      setArquivos((prev) => [...prev, ...novosArquivos]);
    }
  };

  const removerArquivo = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: InformacaoForm) => {
    try {
      setEnviando(true);
      setErro(null);

      const informacaoCompleta = `${data.informacao}${
        data.localizacao ? ` | Local avistado: ${data.localizacao}` : ""
      }${data.telefone ? ` | Contato: ${data.telefone}` : ""}`;

      await api.enviarInformacao({
        informacao: informacaoCompleta,
        descricao: data.descricao,
        data: data.data,
        ocoId: ocorrenciaId,
        files: arquivos,
      });

      reset();
      setArquivos([]);
      onSuccess();
    } catch (error) {
      console.error("Erro ao enviar informação:", error);
      setErro("Erro ao enviar informação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Enviar Informação
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {erro && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-medium">Erro</p>
              </div>
              <p className="text-red-700 mt-1 text-sm">{erro}</p>
            </div>
          )}

          {/* Informação principal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Informação *
            </label>
            <textarea
              {...register("informacao")}
              rows={4}
              placeholder="Descreva detalhadamente a informação que você possui sobre esta pessoa..."
              className="input-field resize-none"
            />
            {errors.informacao && (
              <p className="mt-1 text-sm text-red-600">
                {errors.informacao.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resumo da informação *
            </label>
            <input
              {...register("descricao")}
              type="text"
              placeholder="Ex: Avistado no centro da cidade"
              className="input-field"
            />
            {errors.descricao && (
              <p className="mt-1 text-sm text-red-600">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data da informação *
              </label>
              <input
                {...register("data")}
                type="date"
                className="input-field"
              />
              {errors.data && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.data.message}
                </p>
              )}
            </div>

            {/* Telefone para contato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone para contato (opcional)
              </label>
              <MaskedInput
                mask="(99) 99999-9999"
                {...register("telefone")}
                placeholder="(65) 99999-9999"
                className="input-field"
              />
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local onde foi avistado (opcional)
            </label>
            <input
              {...register("localizacao")}
              type="text"
              placeholder="Ex: Rua das Flores, 123, Centro - Cuiabá/MT"
              className="input-field"
            />
          </div>

          {/* Upload de arquivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Anexar fotos (opcional)
            </label>
            <div className="space-y-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {arquivos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Arquivos selecionados:
                  </p>
                  {arquivos.map((arquivo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-900 truncate">
                        {arquivo.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerArquivo(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Aviso */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Importante:</p>
                <p>
                  Suas informações serão analisadas pela equipe responsável. Em
                  caso de emergência, entre em contato diretamente com a central
                  pelo telefone 0800 647 7900.
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={enviando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 btn-success flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <div className="loading-spinner w-4 h-4" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Informação
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
