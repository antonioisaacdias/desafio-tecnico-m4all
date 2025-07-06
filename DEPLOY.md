# Deploy em Produção - Guia Rápido

## 🚀 Problemas Corrigidos

### Problema Principal
O frontend estava configurado para usar `localhost:8080` mesmo em produção, causando falha na comunicação entre containers.

### Soluções Implementadas

1. **✅ Comunicação entre containers corrigida**
   - Frontend agora usa `backend:8080` para comunicação interna
   - CORS configurado para aceitar múltiplas origens

2. **✅ Configuração separada para produção**
   - Criado `docker-compose.prod.yml` para ambiente de produção
   - Arquivo `.env.prod.example` com configurações de produção

## 📋 Passos para Deploy

### 1. Preparar ambiente de produção
```bash
# Copiar exemplo de configuração
cp .env.prod.example .env.prod

# Editar .env.prod com suas configurações reais
# - Senhas seguras
# - Domínio real do servidor
# - URLs corretas
```

### 2. Deploy para produção
```bash
# Usar docker-compose de produção
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Deploy para desenvolvimento (local)
```bash
# Usar docker-compose padrão
docker-compose up -d --build
```

## ⚙️ Configurações Importantes

### Frontend (.env ou .env.prod)
```bash
# Para desenvolvimento local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

# Para produção (substitua pelo seu domínio)
NEXT_PUBLIC_API_BASE_URL=http://seu-dominio.com:8080/api/v1
```

### CORS no Backend
- Configurado para aceitar múltiplas origens
- Inclui localhost (dev) e containers (prod)

## 🔧 Troubleshooting

### Se o frontend não conseguir conectar ao backend:

1. **Verificar logs dos containers:**
   ```bash
   docker-compose logs frontend
   docker-compose logs backend
   ```

2. **Verificar se os containers estão na mesma rede:**
   ```bash
   docker network ls
   docker network inspect desafio-tecnico-m4all_app-network
   ```

3. **Testar conectividade entre containers:**
   ```bash
   docker exec frontend ping backend
   ```

### URLs corretas por ambiente:

- **Desenvolvimento**: `http://localhost:8080/api/v1`
- **Produção (containers)**: `http://backend:8080/api/v1`
- **Produção (cliente)**: `http://seu-dominio.com:8080/api/v1`
