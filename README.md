# 🚨 SPA - Pessoas Desaparecidas (Polícia Judiciária Civil de MT)

Aplicação **Front-end (SPA)** desenvolvida em **JavaScript/TypeScript**, consumindo a API pública da Polícia Judiciária Civil de Mato Grosso para consulta e envio de informações sobre pessoas desaparecidas ou já localizadas.

O projeto foi construído com foco em:

- **Componentização**
- **Responsividade**
- **UX/UI limpo e intuitivo**
- **Boas práticas de desenvolvimento front-end**
- **Empacotamento em Docker**

---

## 📌 Funcionalidades

- Listagem de pessoas desaparecidas ou localizadas em **cards**.
- **Paginação** (mínimo 10 registros por página).
- **Busca filtrada** conforme parâmetros suportados pela API.
- Página de **detalhes do registro**, com informações completas e destaque para o status (_Desaparecida_ ou _Localizada_).
- Envio de **informações adicionais** (observações, localização, fotos).
- Formulários com **validações e máscaras** (datas, telefones, etc.).
- Tratamento de erros em requisições.
- **Lazy loading** nas rotas para melhor performance.

---

## 🔗 API Utilizada

A aplicação consome a API oficial:
👉 [Documentação da API - Swagger](https://abitus-api.geia.vip/swagger-ui/index.html)

---

## 🛠️ Tecnologias Utilizadas

- **React** ou **Vue** (ou outro framework SPA de sua escolha)
- **TypeScript** ou **JavaScript ES6+**
- **TailwindCSS** (estilização responsiva e rápida)
- **Axios** (requisições HTTP)
- **React Router / Vue Router** (rotas com lazy loading)
- **Docker** (containerização da aplicação)

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Rodar em ambiente de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação ficará disponível em:
👉 `http://localhost:5173` (ou conforme configuração do Vite/React/Vue).

---

## 🐳 Rodando com Docker

### 1. Construir a imagem

```bash
docker build -t pessoas-desaparecidas .
```

### 2. Rodar o container

```bash
docker run -p 3000:3000 pessoas-desaparecidas
```

Acesse: 👉 `http://localhost:3000`

---

## 🧪 Testes

Para rodar os testes automatizados:

```bash
npm run test
# ou
yarn test
```

---

## 👨‍💻 Autor

- **Nome:** \[Artur Guilherme dos Santos Maidana]
- **E-mail:** \[arturmaidaan2712@gmail.com]
- **Telefone:** \[65984227220]
- **GitHub:** \(https://github.com/ArturMaidana)

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica.

---

Quer que eu já prepare esse **README.md** em markdown formatado pronto para colar no seu repositório, ou prefere que eu monte uma versão enxuta só com os pontos obrigatórios do teste?
