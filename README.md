# 🖨️ Sistema de Gestão de Impressoras - Media4All

## � Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo para estágio na **Media4All**. Consiste em um sistema completo de gestão de impressoras que permite:

- 📊 **Gerenciamento completo de impressoras** (CRUD)
- 🔄 **Sincronização automática** com APIs externas
- 📈 **Dashboard de estatísticas** em tempo real
- 🎛️ **Filtros avançados** para busca e organização
- 📱 **Interface responsiva** e moderna

O sistema é composto por um **frontend em React/Next.js** que se comunica com um **backend Spring Boot**, utilizando **MySQL** como banco de dados, tudo containerizado com **Docker**.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com SSR e otimizações automáticas
- **TypeScript** - Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** - Framework CSS utility-first para estilização rápida
- **FontAwesome** - Biblioteca de ícones profissionais
- **React Hot Toast** - Sistema de notificações elegantes
- **Radix UI** - Componentes acessíveis para modais
- **Lucide React** - Ícones modernos e leves

### Backend
- **Spring Boot 3.5.3** - Framework Java para APIs REST
- **Spring Data JPA** - Abstração para persistência de dados
- **Spring Validation** - Validação de dados de entrada
- **MySQL Connector** - Driver para conexão com MySQL
- **Lombok** - Redução de boilerplate code
- **Maven** - Gerenciamento de dependências

### Infraestrutura
- **Docker** - Containerização de aplicações
- **Docker Compose** - Orquestração de múltiplos containers
- **MySQL 8.0** - Sistema de gerenciamento de banco de dados

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passo a Passo

#### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd desafio-tecnico-m4all
```

#### 2. Configure as Variáveis de Ambiente

**2.1. Crie o arquivo principal .env:**
```bash
cp .env-exemple .env
```

**2.2. Edite o arquivo .env com suas configurações:**
```env
# BANCO DE DADOS MYSQL
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=media4all_printers
MYSQL_USER=user
MYSQL_PASSWORD=senha123

# BACKEND (SPRING BOOT)
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/media4all_printers?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=senha123

# API EXTERNA PARA SINCRONIZAÇÃO
EXTERNAL_API_PRINTERS_URL=https://mt.tracerly.net
```

**2.3. Configure o frontend (arquivo separado):**
```bash
cp frontend/.env.example frontend/.env
```

Edite o `frontend/.env`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

#### 3. Execute o Projeto
```bash
# Construir e executar todos os serviços
docker-compose up --build

# Ou executar em background
docker-compose up --build -d
```

#### 4. Acesse as Aplicações
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3306

### Comandos Úteis

```bash
# Parar todos os serviços
docker-compose down

# Remover volumes (apaga dados do banco)
docker-compose down -v

# Visualizar logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql

# Rebuild de um serviço específico
docker-compose up --build frontend
```

---

## 📡 API Documentation - Rotas do Backend

### Base URL
```
http://localhost:8080/api/v1
```

### 🖨️ Impressoras (`/printers`)

#### `GET /printers`
**Descrição:** Lista todas as impressoras com paginação e filtros

**Parâmetros de Query:**
```typescript
{
  page?: number;        // Página (padrão: 0)
  size?: number;        // Itens por página (padrão: 20)
  name?: string;        // Filtro por nome
  model?: string;       // Filtro por modelo
  location?: string;    // Filtro por localização
  status?: string;      // Filtro por status
  sortBy?: string;      // Campo para ordenação (padrão: "name")
  sortDir?: string;     // Direção da ordenação (asc/desc, padrão: "asc")
}
```

**Resposta (200 OK):**
```json
{
  "content": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "HP LaserJet Pro",
      "model": "M404dn",
      "location": "Escritório Central",
      "status": "Online",
      "paperCapacity": 250
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false
    },
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalElements": 1,
  "totalPages": 1,
  "first": true,
  "last": true
}
```

#### `POST /printers`
**Descrição:** Cria uma nova impressora

**Body:**
```json
{
  "name": "HP LaserJet Pro",
  "model": "M404dn",
  "location": "Escritório Central",
  "status": "Online",
  "paperCapacity": 250
}
```

**Resposta (201 Created):**
```json
{
  "status": "success",
  "message": "Impressora criada com sucesso"
}
```

#### `GET /printers/{id}`
**Descrição:** Obtém uma impressora específica por ID

**Parâmetros:**
- `id` (UUID): ID da impressora

**Resposta (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "HP LaserJet Pro",
  "model": "M404dn",
  "location": "Escritório Central",
  "status": "Online",
  "paperCapacity": 250
}
```

#### `PUT /printers/{id}`
**Descrição:** Atualiza uma impressora existente

**Parâmetros:**
- `id` (UUID): ID da impressora

**Body:**
```json
{
  "name": "HP LaserJet Pro Atualizada",
  "model": "M404dn",
  "location": "Escritório Central - Sala 2",
  "status": "Offline",
  "paperCapacity": 500
}
```

**Resposta (200 OK):**
```json
{
  "status": "success",
  "message": "Impressora atualizada com sucesso"
}
```

#### `DELETE /printers/{id}`
**Descrição:** Remove uma impressora

**Parâmetros:**
- `id` (UUID): ID da impressora

**Resposta (204 No Content)**

#### `GET /printers/{id}/status`
**Descrição:** Obtém apenas o status e capacidade de papel de uma impressora

**Parâmetros:**
- `id` (UUID): ID da impressora

**Resposta (200 OK):**
```json
{
  "status": "Online",
  "paperCapacity": 250
}
```

### 📊 Sincronização (`/sync`)

#### `GET /sync/statistics`
**Descrição:** Obtém estatísticas de sincronização com API externa

**Headers de Resposta:**
```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

**Resposta (200 OK):**
```json
{
  "totalSyncs": 150,
  "successCount": 142,
  "failureCount": 8,
  "lastProcessed": 45,
  "lastSyncAt": "2025-01-07T10:30:00"
}
```

### 🚨 Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `400` | Bad Request - Dados inválidos |
| `404` | Not Found - Recurso não encontrado |
| `500` | Internal Server Error - Erro interno |

**Exemplo de Resposta de Erro:**
```json
{
  "timestamp": "2025-01-07T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "O nome da impressora é obrigatório",
  "path": "/api/v1/printers"
}
```

---

## 📁 Estrutura do Projeto

```
desafio-tecnico-m4all/
├── 📁 frontend/                 # Aplicação Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   ├── 📁 components/   # Componentes reutilizáveis
│   │   │   ├── 📁 impressoras/  # Página de gestão de impressoras
│   │   │   ├── 📁 estatisticas/ # Página de estatísticas
│   │   │   └── 📁 types/        # Definições de tipos TypeScript
│   │   └── 📁 lib/              # Utilitários e configurações
│   ├── 📄 package.json
│   ├── 📄 .env.example
│   └── 📄 Dockerfile
├── 📁 backend/                  # API Spring Boot
│   ├── 📁 src/main/java/com/media4all/backend/
│   │   ├── 📁 controller/       # Controllers REST
│   │   ├── 📁 business/         # Lógica de negócio
│   │   ├── 📁 dto/              # Data Transfer Objects
│   │   ├── 📁 infraestructure/  # Camada de dados
│   │   ├── 📁 config/           # Configurações
│   │   └── 📁 exception/        # Tratamento de exceções
│   ├── 📄 pom.xml
│   └── 📄 Dockerfile
├── 📄 docker-compose.yml        # Orquestração dos containers
├── 📄 .env-exemple              # Exemplo de variáveis de ambiente
├── 📄 README.md                 # Este arquivo
└── 📄 CONFIGURACAO_AMBIENTE.md  # Guia detalhado de configuração
```

---

## 🔧 Desenvolvimento Local

### Frontend
```bash
cd frontend
npm install
npm run dev
# Acesse: http://localhost:3001
```

### Backend
```bash
cd backend
mvn spring-boot:run
# Acesse: http://localhost:8080
```

### Banco de Dados
Configure um MySQL local ou use Docker:
```bash
docker run --name mysql-local -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Frontend
- [x] Dashboard responsivo com design moderno
- [x] CRUD completo de impressoras
- [x] Sistema de filtros avançados
- [x] Paginação de resultados
- [x] Modais para edição e visualização
- [x] Página de estatísticas em tempo real
- [x] Sistema de notificações (toast)
- [x] Tratamento de erros da API

### ✅ Backend
- [x] API REST completa (CRUD)
- [x] Validação de dados de entrada
- [x] Paginação e ordenação
- [x] Filtros dinâmicos
- [x] Tratamento global de exceções
- [x] Sincronização com API externa
- [x] Configuração de CORS
- [x] Documentação das rotas

### ✅ Infraestrutura
- [x] Containerização completa com Docker
- [x] Orquestração com Docker Compose
- [x] Configuração de banco de dados
- [x] Variáveis de ambiente organizadas
- [x] Scripts de build otimizados

---

## 📧 Contato

Projeto desenvolvido para o processo seletivo da **Media4All**.

**Desenvolvedor:** Antonio  
**Objetivo:** Vaga de Estágio em Desenvolvimento  
**Data:** Julho de 2025

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica no processo seletivo da Media4All.
