# 📘 API de Gerenciamento de Usuários - NestJS

Este projeto é uma API RESTful desenvolvida com **NestJS** para gerenciamento de usuários, contendo operações de **CRUD** e envio de **e-mails de boas-vindas**.

## 🚀 Funcionalidades

- Criar, buscar, atualizar e remover usuários.
- Validações de entrada com `class-validator`.
- Criptografia de senha com `bcrypt`.
- Envio de e-mail de boas-vindas ao cadastrar usuário com `@nestjs-modules/mailer` e `nodemailer`.

---

## 🧱 Estrutura da Entidade `User`

| Campo      | Tipo   | Regras                     |
| ---------- | ------ | -------------------------- |
| `nome`     | string | Obrigatório                |
| `telefone` | string | Obrigatório, único         |
| `email`    | string | Obrigatório, único         |
| `senha`    | string | Obrigatório, criptografado |

---

## 📡 Endpoints

### ➕ `POST /users` - Criar usuário

- **Regras**:

  - E-mail e telefone devem ser únicos.
  - Senha é criptografada com bcrypt.
  - Envio de e-mail de boas-vindas após criação.

- **Validações**:
  - `409 Conflict`: e-mail ou telefone já existentes.
  - `500 Internal Server Error`: erro no banco de dados.
  - `200 OK`: usuário criado com sucesso.

### 📧 Envio de E-mail de Boas-vindas

- **Assunto**: `Bem-vindo ao sistema!`
- **Corpo**: Nome do usuário + mensagem amigável.
- **Erro no envio**:
  - Usuário ainda será criado.
  - O erro será logado.
  - A resposta indicará que o e-mail não foi enviado.

### 🔍 `GET /users/:id` - Buscar usuário por ID

- **Validações**:
  - `404 Not Found`: usuário não encontrado.
  - `200 OK`: retorna dados do usuário.

### ✏️ `PUT /users/:id` - Atualizar usuário

- **Regras**:

  - Pode atualizar: nome, telefone, email, senha.
  - Senha continua criptografada.
  - E-mail e telefone devem continuar únicos.

- **Validações**:
  - `404 Not Found`: usuário não encontrado.
  - `409 Conflict`: e-mail ou telefone já utilizados.
  - `500 Internal Server Error`: erro ao atualizar.
  - `200 OK`: retorna dados atualizados.

### ❌ `DELETE /users/:id` - Remover usuário

- **Validações**:
  - `404 Not Found`: usuário não encontrado.
  - `500 Internal Server Error`: erro ao remover.
  - `200 OK`: confirmação de remoção.

---

## 🛠 Requisitos Técnicos

- ✅ NestJS com estrutura de **Modules, Controllers, Services, DTOs**
- ✅ ORM: **TypeORM** ou **Prisma**
- ✅ **class-validator** para validações
- ✅ **bcrypt** para criptografar senhas
- ✅ **@nestjs-modules/mailer** + **nodemailer** para envio de e-mails
- ✅ Tratamento de erros com **HTTP status apropriados**
- ✅ Uso de **DTOs** para entrada e saída de dados

---

## ▶️ Como rodar o projeto

1. **Clone o repositório**

```bash
git clone https://github.com/jorgemiguelbamaq/teste-gabriel-jordan.git
cd teste-gabriel-jordan
```
