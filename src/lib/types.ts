// Tipos baseados na documentação oficial da API da Polícia Civil MT

export interface PessoaDTO {
  ocoId: number;
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: OcorrenciaDTO;
}

export interface OcorrenciaDTO {
  ocorrenciaFrequesaDisparo: any;
  dtDesaparecimento: string;
  dataLocalizacao?: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz: OcorrenciaCartazDTO[];
  ocoId: number;
}

export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface OcorrenciaCartazDTO {
  urlCartaz: string;
  tipoCartaz:
    | "PDF_DESAPARECIDO"
    | "PDF_LOCALIZADO"
    | "JPG_DESAPARECIDO"
    | "JPG_LOCALIZADO"
    | "INSTA_DESAPARECIDO"
    | "INSTA_LOCALIZADO";
}

export interface PessoaFiltro {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO";
  pagina?: number;
  porPagina?: number;
  status?: "DESAPARECIDO" | "LOCALIZADO";
}

export interface PagePessoaDTO {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: PessoaDTO[];
  number: number;
  empty: boolean;
}

export interface EstatisticaPessoaDTO {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export interface MotivoDto {
  id: number;
  descricao: string;
}

export interface OcorrenciaInformacaoDTO {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos: string[];
}

export interface InformacaoDesaparecidoRequest {
  informacao: string;
  descricao: string;
  data: string;
  ocoId: number;
  files?: File[];
}

// Tipos para o formulário
export interface InformacaoFormData {
  informacao: string;
  descricao: string;
  data: string;
  localizacao?: string;
  telefone?: string;
}
