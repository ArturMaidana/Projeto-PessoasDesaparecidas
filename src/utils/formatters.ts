import { PessoaDTO } from "../lib/types";

export function formatarData(data: string): string {
  if (!data) return "Não informado";

  try {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Data inválida";
  }
}

export function calcularIdade(dataNascimento: string): string {
  if (!dataNascimento) return "Não informado";

  try {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      return (idade - 1).toString();
    }

    return idade.toString();
  } catch {
    return "Idade não calculável";
  }
}

export function formatarTelefone(telefone: string): string {
  if (!telefone) return "";

  const apenasNumeros = telefone.replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return telefone;
}

export function formatarCEP(cep: string): string {
  if (!cep) return "";

  const apenasNumeros = cep.replace(/\D/g, "");

  if (apenasNumeros.length === 8) {
    return apenasNumeros.replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  return cep;
}

export function tempoDesaparecido(dataDesaparecimento: string): string {
  if (!dataDesaparecimento) return "Não informado";

  try {
    const desaparecimento = new Date(dataDesaparecimento);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - desaparecimento.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 dia";
    if (diffDays < 30) return `${diffDays} dias`;
    if (diffDays < 365) {
      const meses = Math.floor(diffDays / 30);
      return meses === 1 ? "1 mês" : `${meses} meses`;
    }

    const anos = Math.floor(diffDays / 365);
    return anos === 1 ? "1 ano" : `${anos} anos`;
  } catch {
    return "Tempo não calculável";
  }
}

export function obterStatusPessoa(pessoa: PessoaDTO): {
  status: "DESAPARECIDO" | "LOCALIZADO";
  cor: string;
  texto: string;
} {
  const temDataLocalizacao = pessoa.ultimaOcorrencia?.dataLocalizacao;

  if (temDataLocalizacao) {
    return {
      status: "LOCALIZADO",
      cor: "bg-green-100 text-green-800 border-green-200",
      texto: pessoa.ultimaOcorrencia.encontradoVivo
        ? "Localizado Vivo"
        : "Localizado",
    };
  }

  return {
    status: "DESAPARECIDO",
    cor: "bg-red-100 text-red-800 border-red-200",
    texto: "Desaparecido",
  };
}
