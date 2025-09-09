import {
  PessoaDTO,
  PessoaFiltro,
  PagePessoaDTO,
  EstatisticaPessoaDTO,
  MotivoDto,
  InformacaoDesaparecidoRequest,
  OcorrenciaInformacaoDTO,
} from "./types";

const API_BASE_URL = "https://abitus-api.geia.vip";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Erro de conexão com a API");
  }
}

export const api = {
  // Buscar pessoas com filtros e paginação
  async buscarPessoas(filtros: PessoaFiltro = {}): Promise<PagePessoaDTO> {
    const params = new URLSearchParams();

    if (filtros.nome) params.append("nome", filtros.nome);
    if (filtros.faixaIdadeInicial !== undefined)
      params.append("faixaIdadeInicial", filtros.faixaIdadeInicial.toString());
    if (filtros.faixaIdadeFinal !== undefined)
      params.append("faixaIdadeFinal", filtros.faixaIdadeFinal.toString());
    if (filtros.sexo) params.append("sexo", filtros.sexo);
    if (filtros.status) params.append("status", filtros.status);

    params.append("pagina", (filtros.pagina || 0).toString());
    params.append("porPagina", (filtros.porPagina || 10).toString());

    const queryString = params.toString();
    const endpoint = `/v1/pessoas/aberto/filtro${
      queryString ? `?${queryString}` : ""
    }`;

    return fetchApi<PagePessoaDTO>(endpoint);
  },

  // Buscar pessoa por ID
  async buscarPessoaPorId(id: number): Promise<PessoaDTO> {
    return fetchApi<PessoaDTO>(`/v1/pessoas/${id}`);
  },

  // Buscar estatísticas
  async buscarEstatisticas(): Promise<EstatisticaPessoaDTO> {
    return fetchApi<EstatisticaPessoaDTO>("/v1/pessoas/aberto/estatistico");
  },

  // Buscar pessoas aleatórias com fotos
  async buscarPessoasAleatorias(registros: number = 4): Promise<PessoaDTO[]> {
    return fetchApi<PessoaDTO[]>(
      `/v1/pessoas/aberto/dinamico?registros=${registros}`
    );
  },

  // Buscar motivos
  async buscarMotivos(): Promise<MotivoDto[]> {
    return fetchApi<MotivoDto[]>("/v1/ocorrencias/motivos");
  },

  async enviarInformacao(
    data: InformacaoDesaparecidoRequest
  ): Promise<OcorrenciaInformacaoDTO> {
    // 1. Construir a URL com os parâmetros de texto
    const params = new URLSearchParams();
    params.append("informacao", data.informacao);
    params.append("descricao", data.descricao);
    params.append("data", data.data);
    params.append("ocoId", data.ocoId.toString());

    const endpoint = `/v1/ocorrencias/informacoes-desaparecido?${params.toString()}`;

    // 2. Preparar o FormData APENAS com os arquivos
    const formData = new FormData();
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file); // Usando o nome correto "files"
      });
    }

    // 3. Fazer a requisição com a URL correta e o corpo contendo só os arquivos
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
      // Não defina o 'Content-Type' aqui!
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Erro HTTP: ${response.status}`);
    }

    return await response.json();
  },
};
