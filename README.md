# 🗂️ Kanban Field Control

<div align="center">

![Kanban](https://img.shields.io/badge/Kanban-Field%20Control-6C63FF?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Aplicação fullstack de Kanban desenvolvida como desafio técnico.**  
Frontend em Angular · Backend em NestJS · Deploy na Vercel e Render.

[🌐 Acessar App](https://kanbanfieldcontrol.vercel.app/) · [📖 Como Rodar](#️-como-rodar-localmente) · [👨‍💻 Autor](#-autor-1)

</div>

---

## ✨ Funcionalidades

| Recurso | Status |
|---|---|
| Criar colunas | ✅ |
| Criar cards | ✅ |
| Editar cards | ✅ |
| Reordenar cards entre colunas (Drag & Drop) | ✅ |
| Persistência de dados via API REST | ✅ |

---

## 🌐 Deploy

| Camada | Plataforma | URL |
|---|---|---|
| 🖥️ Deploy do Sistema | Vercel | [kanbanfieldcontrol.vercel.app](https://kanbanfieldcontrol.vercel.app/) |

> [!WARNING]
> O projeto está hospedado no plano **gratuito** da Vercel e do Render.  
> Após um período sem acessos, o backend pode **hibernar**.  
> Ao reativar, aguarde de **30s a 1min** para o servidor responder normalmente.

---

## 🧠 Tecnologias

<table>
  <tr>
    <td valign="top" width="50%">

### 🖥️ Frontend
- **Angular** — Framework principal
- **TypeScript** — Tipagem estática
- **Angular CDK** — Drag and Drop
- **RxJS** — Programação reativa
- **CSS** — Estilização

  </td>
  <td valign="top" width="50%">

### ⚙️ Backend
- **NestJS** — Framework Node.js
- **TypeScript** — Tipagem estática
- **Node.js** — Runtime
- **REST API** — Comunicação HTTP
- **CORS** — Controle de acesso

  </td>
  </tr>
</table>

---

## 🏗️ Arquitetura

O projeto adota uma arquitetura **desacoplada**, com frontend e backend independentes:
```
kanban-field-control/
├── frontend/     → Aplicação Angular (SPA)
└── backend/      → API REST com NestJS
```

O frontend consome a API REST do backend para todas as operações de colunas e cards.

---

## 📁 Estrutura de Pastas

<table>
  <tr>
    <td valign="top" width="50%">

**Frontend**
```
src/
└── app/
    ├── components/
    ├── services/
    └── models/
```

  </td>
  <td valign="top" width="50%">

**Backend**
```
src/
├── modules/
├── controllers/
├── services/
└── dto/
```

  </td>
  </tr>
</table>

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- Angular CLI instalado (`npm install -g @angular/cli`)

### 1️⃣ Clonar o repositório
```bash
git clone <url-do-repositorio>
cd kanban-field-control
```

### 2️⃣ Rodar o Backend
```bash
cd backend
npm install
npm run start:dev
```

> API disponível em: `http://localhost:3000`

### 3️⃣ Rodar o Frontend

Em outro terminal:
```bash
cd frontend
npm install
ng serve
```

> Aplicação disponível em: `http://localhost:4200`

---

## 🧪 Testes

**Frontend:**
```bash
ng test
```

**Backend:**
```bash
npm run test
npm run test:e2e
```

---

## 🚧 Principais Desafios

Durante o desenvolvimento, alguns desafios técnicos exigiram atenção especial:

- 🔄 Implementação do **Drag and Drop** com persistência de estado
- 🏛️ Organização da arquitetura modular no **NestJS**
- ⚠️ Tratamento correto de erros HTTP (`400`, `404`)
- 🌐 Configuração de **CORS** entre frontend e backend
- 📦 Ajustes no deploy (estrutura da pasta `dist`)
- 😴 Comportamento de hibernação no **Render** (plano gratuito)

---

## ✅ Boas Práticas Aplicadas

- 📐 Separação clara de responsabilidades (Frontend / Backend)
- 🔧 Uso de **Services** no Angular para abstração de chamadas HTTP
- 🧩 Estrutura **modular** no NestJS
- 🔒 **Tipagem forte** com TypeScript em toda a aplicação
- 🧱 Organização por **componentes reutilizáveis**
- 🧼 Código limpo e legível

---

## 👨‍💻 Autor

<div align="center">

**Pedro Moraes**  
Desenvolvedor Fullstack

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedro-moraes-31526233a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroMoraes57)

</div>

---
