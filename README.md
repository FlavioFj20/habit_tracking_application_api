# Habit Tracking API

API REST para gerenciamento de hábitos, autenticação de usuários e acompanhamento de rotina diária. O projeto foi desenvolvido com base no curso **API Design v5** da **FrontendMaster**, do **Scott Moss**.

## Sobre o projeto

Esta aplicação foi construída com foco em boas práticas de arquitetura de API, validação de dados, autenticação via JWT e persistência com PostgreSQL. A ideia central é permitir que cada usuário crie sua conta, gerencie hábitos e acompanhe sua rotina com segurança.

O projeto utiliza:

- Node.js com TypeScript
- Express para o servidor HTTP
- PostgreSQL como banco de dados
- Drizzle ORM para acesso e migração de dados
- Zod para validação de entrada
- JWT para autenticação
- bcrypt para hash de senha

## Funcionalidades

- Cadastro e login de usuários
- Autenticação com token JWT
- Criação, listagem, atualização e remoção de hábitos
- Associação de hábitos com tags
- Estrutura preparada para entradas de conclusão e estatísticas
- Validação centralizada de corpo, parâmetros e query string
- Middlewares de segurança e logs com Helmet, CORS e Morgan

## Estrutura do projeto

```text
src/
	controllers/   # Regras de negócio da API
	db/            # Conexão, schema e seed do banco
	middleware/    # Autenticação e validações
	routes/        # Rotas da API
	utils/         # Utilitários de JWT e senha
```

## Requisitos

- Node.js 20 ou superior
- PostgreSQL
- npm

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
NODE_ENV=development
APP_STAGE=dev
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/habit_tracker
JWT_SECRET=uma_chave_muito_segura_com_pelo_menos_32_caracteres
JWT_EXPIRE_IN=7d
BCRYPT_ROUNDS=12
```

## Instalação

```bash
npm install
```

## Scripts disponíveis

- `npm run dev` - inicia o servidor em modo desenvolvimento
- `npm start` - inicia o servidor em modo produção/local
- `npm run db:generate` - gera migrations do Drizzle
- `npm run db:push` - aplica o schema no banco
- `npm run db:migrate` - executa migrations pendentes
- `npm run db:studio` - abre o Drizzle Studio
- `npm run db:seed` - executa o seed do banco
- `npm test` - executa os testes com Vitest
- `npm run test:watch` - executa testes em modo watch
- `npm run test:coverage` - executa cobertura de testes

## Como executar

1. Configure o arquivo `.env`.
2. Instale as dependências com `npm install`.
3. Execute as migrations do banco.
4. Inicie a aplicação com `npm run dev`.

## Endpoints

A base da API é:

```text
/api
```

### Health check

- `GET /health`

### Autenticação

- `POST /api/auth/register`
- `POST /api/auth/login`

### Usuário

- `GET /api/user`
- `GET /api/user/:id`
- `PUT /api/user/:id`
- `DELETE /api/user/:id`

### Hábitos

- `GET /api/habit`
- `POST /api/habit`
- `PATCH /api/habit/:id`
- `GET /api/habit/:id`
- `DELETE /api/habit/:id`
- `POST /api/habit/:id/complete`

## Autenticação

Rotas protegidas exigem token JWT no header `Authorization`:

```http
Authorization: Bearer <seu-token>
```

## Banco de dados

O schema principal inclui tabelas para:

- usuários
- hábitos
- entradas de conclusão
- tags
- associação entre hábitos e tags

As migrations ficam em `migrations/` e o schema em `src/db/schema.ts`.

## Observações

Este projeto está alinhado ao conteúdo do curso **API Design v5** da **FrontendMaster**, ministrado por **Scott Moss**. A documentação acima descreve o estado atual da base de código e pode evoluir conforme novas rotas e regras de negócio forem implementadas.

## Licença

Projeto distribuído sob a licença ISC.
