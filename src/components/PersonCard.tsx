"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, User } from "lucide-react";
import { PessoaDTO } from "../lib/types";
import {
  formatarData,
  obterStatusPessoa,
  tempoDesaparecido,
} from "../utils/formatters";

interface PersonCardProps {
  pessoa: PessoaDTO;
}

export default function PersonCard({ pessoa }: PersonCardProps) {
  const statusInfo = obterStatusPessoa(pessoa);

  return (
    <Link href={`/pessoa/${pessoa.id}`}>
      <div className="card hover:scale-[1.02] transition-transform duration-200 cursor-pointer h-full flex flex-col">
        {/* Status Badge */}
        <div className="relative">
          <div
            className={`absolute top-3 right-3 z-10 status-badge ${statusInfo.cor}`}
          >
            {statusInfo.texto}
          </div>

          {/* Foto */}
          <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
            {pessoa.urlFoto ? (
              <Image
                src={pessoa.urlFoto}
                alt={`Foto de ${pessoa.nome}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}

            {/* Fallback quando não há foto */}
            <div
              className={`w-full h-full flex items-center justify-center bg-gray-200 ${
                pessoa.urlFoto ? "hidden" : ""
              }`}
            >
              <User className="w-16 h-16 text-gray-400" />
              <span className="sr-only">Foto não disponível</span>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="p-4 space-y-3 flex-grow">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {pessoa.nome}
            </h3>
            <p className="text-sm text-gray-600">
              {pessoa.idade} anos •{" "}
              {pessoa.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
            </p>
          </div>

          {/* Local do desaparecimento */}
          {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">
                {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
              </span>
            </div>
          )}

          {/* Data do desaparecimento */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>
              Desapareceu:{" "}
              {formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}
            </span>
          </div>

          {/* Tempo desaparecido */}
          {statusInfo.status === "DESAPARECIDO" && (
            <div className="text-sm text-red-600 font-medium">
              Há {tempoDesaparecido(pessoa.ultimaOcorrencia?.dtDesaparecimento)}
            </div>
          )}

          {/* Data de localização se encontrado */}
          {statusInfo.status === "LOCALIZADO" &&
            pessoa.ultimaOcorrencia?.dataLocalizacao && (
              <div className="text-sm text-green-600 font-medium">
                Localizado em:{" "}
                {formatarData(pessoa.ultimaOcorrencia.dataLocalizacao)}
              </div>
            )}
        </div>
      </div>
    </Link>
  );
}
