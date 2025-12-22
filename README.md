# 💰 Sistema de Gerenciamento de Gastos

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![.NET](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

Aplicação Full-Stack para controle financeiro residencial/pessoal. O sistema permite o gerenciamento de pessoas, categorias e transações financeiras (receitas e despesas), com regras de negócio específicas e relatórios de totais.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Regras de Negócio](#-regras-de-negócio)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar](#-como-rodar)
  - [Back-end](#back-end)
  - [Front-end](#front-end)
- [Documentação da API](#-documentação-da-api)

---

## 🚀 Funcionalidades

- **Autenticação:** Cadastro e Login de usuários via JWT.
- **Gestão de Pessoas:** Cadastro, listagem e remoção de pessoas.
- **Gestão de Categorias:** Cadastro e listagem de categorias financeiras (Receita, Despesa ou Ambas).
- **Transações:** Lançamento de receitas e despesas vinculadas a uma pessoa e categoria.
- **Relatórios:**
  - Totais por Pessoa (Saldo, Total Receitas, Total Despesas).
  - Totais por Categoria.

## ⚖️ Regras de Negócio

Durante o desenvolvimento, foram implementadas as seguintes validações:

1. **Exclusão de Pessoas:** Ao deletar uma pessoa, **todas** as transações vinculadas a ela são excluídas automaticamente (Cascading Delete).
2. **Exclusão de Categorias:** Não é permitido excluir uma categoria que já possua transações vinculadas.
3. **Menores de Idade:** Se a pessoa selecionada na transação for menor de 18 anos, o sistema permite lançar **apenas Despesas**.
4. **Consistência de Categoria:** Não é permitido lançar uma Despesa utilizando uma categoria do tipo "Receita" (e vice-versa).

---

## 🛠 Tecnologias Utilizadas

### Back-end (API)
- **C# .NET 8.0**
- **ASP.NET Core Web API**
- **Entity Framework Core** (ORM)
- **Swagger UI** (Documentação)
- **JWT** (Autenticação)

### Front-end (Web)
- **React.js**
- **TypeScript**
- **Material UI (MUI)** (Componentes visuais)
- **Axios** (Consumo de API)
- **React Router DOM** (Roteamento)
- **React Toastify** (Notificações/Toasts)
- **Context API** (Gerenciamento de Estado de Autenticação)

---

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura em camadas (Layered Architecture) no Back-end e organização por funcionalidades no Front-end.

```text
/
├── src/
│   ├── Gastos.Api          # Controladores e Configuração
│   ├── Gastos.Application  # Regras de Negócio, Services e DTOs
│   ├── Gastos.Domain       # Entidades e Interfaces
│   └── Gastos.Infrastructure # Contexto do Banco e Repositórios
└── frontend/
    ├── src/
    │   ├── api/            # Configuração do Axios e Services
    │   ├── components/     # Navbar, PrivateRoute, etc.
    │   ├── contexts/       # AuthContext
    │   ├── models/         # Interfaces TypeScript
    │   └── pages/          # Telas (Login, Dashboard, Pessoas, etc.)

```

---

## ✅ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

* [.NET SDK 8.0](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* Um banco de dados SQL Server (ou LocalDB configurado no `appsettings.json`)

---

## 🏃‍♂️ Como Rodar

### Back-end
Clone o projeto(Container não disponível no momento)
1. Navegue até a pasta da API:
```bash
cd src/Gastos.Api

```


2. Configure a String de Conexão no arquivo `appsettings.json`.
3. Execute as migrações (se estiver usando EF Core):
```bash
dotnet ef database update

```


4. Rode a aplicação:
```bash
dotnet run

```


*A API estará rodando em `http://localhost:5000` (ou porta configurada).*

### Front-end

1. Navegue até a pasta do frontend:
```bash
cd frontend

```


2. Instale as dependências:
```bash
npm install
# ou
yarn install

```


3. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```


4. Acesse a aplicação no navegador em `http://localhost:5173`.

---

## Observações

Atualmente, o projeto **não está containerizado (Docker)**.
Para execução, é necessário rodar a aplicação localmente conforme as instruções acima.

A containerização foi considerada, mas não implementada nesta versão inicial do projeto.

## 📖 Documentação da API

Com o Back-end rodando, você pode acessar a documentação interativa e testar os endpoints através do Swagger:

🔗 **Swagger UI:** `http://localhost:5000/swagger` (ajuste a porta conforme sua configuração local).

Os endpoints estão documentados com os códigos de retorno HTTP (200, 201, 400, 401, 404) e esquemas de dados.

---

Desenvolvido para fins de estudo e portfólio. 

Vídeo da aplicação:
```
https://jam.dev/c/6997369d-fff2-429c-97ec-4441d4814607
```
