# 📢 News Streak - Sistema de Gamificação para Leitores

Este projeto tem como objetivo aumentar o engajamento dos leitores da newsletter **News Streak** através de um sistema de gamificação, permitindo que os usuários acompanhem seu streak de leitura e visualizem rankings de engajamento. Além disso, há um **dashboard administrativo** para análise de métricas.

---

## 🚀 Funcionalidades da aplicação

### 🧑‍💻 Área de Login para Leitores

- Página de **login via e-mail**.
- Exibição do **streak atual** (quantos dias seguidos abriu a newsletter).
- Histórico de leituras.
- Mensagens motivacionais para incentivar a continuidade.

### 📊 Dashboard Administrativo

- Visualização das métricas de **engajamento geral**.
- Ranking dos leitores mais engajados.
- Filtros para visualizar estatísticas por **newsletter**, **período de tempo** e **status do streak**.
- Gráficos para mostrar padrões de engajamento.

### 🔥 Regras de Streak

- O streak aumenta **+1** a cada dia consecutivo que o leitor abrir a newsletter.
- O streak é **resetado** se o usuário deixar de abrir a newsletter por um dia.
- *Observação:* Não há edições da newsletter aos domingos.

### 🎯 Melhorias 

- **Gamificação:** Adicionar badges ou níveis para incentivar os leitores.
- **Branding:** Melhorar a identidade visual e experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com **Express** para a API.
- **PostgreSQL** como banco de dados relacional.
- **Sequelize** como ORM para gerenciar a comunicação com o banco.
- **Webhooks e APIs externas** (integração com a Beehiiv).

### Frontend
- **React + Vite** com **TypeScript**.
- **TailwindCSS** para estilização.
- **Recharts** para visualização de dados e gráficos no dashboard.

### Infraestrutura
- **Docker** para ambiente isolado e escalável.
- **Vercel** para deployment.

---

## 📌 Perguntas Respondidas

### **1. Stacks**
#### Quais tecnologias foram usadas?

- **Frontend**: React + TypeScript para criar uma interface responsiva e intuitiva.
- **Backend**: Node.js + Express para gerenciar as regras de negócio e comunicação com o banco de dados.
- **Banco de Dados**: PostgreSQL para armazenamento de dados estruturados.
- **APIs externas**: Integração com Beehiiv via webhooks para rastrear interações dos leitores.

#### Desafios enfrentados no desenvolvimento:

Implementação eficiente da lógica de streaks, garantindo que o aumento de streak ocorra corretamente.
Gerenciamento de dados em tempo real, sincronizando interações do usuário com o banco.
Escalabilidade da aplicação para suportar um número crescente de leitores.

#### Estrutura escolhida e justificativa:

O uso de React + TypeScript oferece um código mais seguro e previsível.
O PostgreSQL foi escolhido por sua confiabilidade e suporte para consultas complexas.
A arquitetura baseada em APIs permite a expansão futura com novas funcionalidades.

### **2. Dados**
#### Estrutura do banco de dados:

#### - ***Tabelas principais:***
- `users`: Contém os dados dos leitores e registra os streaks diários de cada usuário..
- `articles`: Armazena informações sobre as newsletters abertas.

#### Como são feitas inserções e consultas dos leitores?

- Um webhook da Beehiiv envia notificações quando um usuário abre um e-mail.
- O backend processa essa informação e atualiza o streak do usuário no PostgreSQL.
- O usuário pode visualizar seu streak e ranking via API no frontend.

#### Escalabilidade:

- O banco de dados é projetado com índices e otimizações para lidar com grandes volumes de consultas.
- A arquitetura baseada em APIs permite distribuir a carga de trabalho.
- Podemos implementar cache para melhorar a performance em consultas frequentes.

### **3. Testes**
#### ***Testes realizados:***

Testes de unidade para verificar a lógica de streaks.
Testes de integração para garantir que os webhooks da Beehiiv sejam processados corretamente.
Testes manuais no frontend para garantir a experiência do usuário.
Tempo de desenvolvimento e testes:

O desenvolvimento inicial levou aproximadamente X semanas.
Os testes e ajustes finais levaram Y dias, focando em otimização e correção de bugs.

---

## Valores da Aplicação

- **Frontend** - Interface intuitiva, bem desenhada e responsiva.
- **SQL** - Queries de alta performance, escaláveis e flexíveis.
- **Experiência do Usuário** - Boa usabilidade na área logada e no dashboard.
- **Qualidade do Código** - Estrutura organizada e boas práticas.
- **Funcionalidade** - O sistema implementa corretamente as regras de streak?

---

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/news-streak.git
   cd news-streak
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5434/news_streak
   PORT=3000
   ```

4. Execute as migrations do banco:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor front-end:
   ```bash
   npm run dev
   ```

6.  Inicie o servidor front-end:
    ```bash
    npm start
    ```

7. Acesse o back-end em `http://localhost:3000` e a API em `http://localhost:3000/api`.
8. Acesse o front-end em `http://localhost:5173`.


---

## Estrutura de Pastas

```
news-streak/
│
├── front-end/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── img/
│   │   │   │   ├── logo.png
│   │   │   │   └── logoNavbar.png
│   │   ├── components/
│   │   │   ├── Article/
│   │   │   │   ├── Article.tsx
│   │   │   │   └── Article.css
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleCard.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.css
│   │   │   ├── LoginModal/
│   │   │   │   ├── LoginModal.tsx
│   │   │   │   └── LoginModal.css
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.css
│   │   ├── HomePage.tsx
│   │   ├── HomePage.css
│   │   ├── variables.css
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── backend/
  ├── config/
  │   ├── db.ts
  │   ├── auth.ts
  ├── controllers/
  │   ├── authController.ts
  ├── models/
  │   ├── user.ts
  ├── routes/
  │   ├── authRoutes.ts
  ├── app.ts
  ├── index.ts
  ├── package.json
  └── .env

## Contribuições

Sinta-se à vontade para contribuir com melhorias! Envie um **Pull Request** ou abra uma **Issue** para discussão.

📧 **Contato:** [LinkedIn](https://www.linkedin.com/in/priscilasdsantos/)
