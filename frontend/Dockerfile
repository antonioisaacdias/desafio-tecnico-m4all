# Dockerfile para Frontend Next.js

# Usar imagem oficial do Node.js
FROM node:18-alpine AS base

# Instalar dependências apenas quando necessário
FROM base AS deps
# Verificar https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine para entender por que libc6-compat pode ser necessário.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependências baseado no package manager preferido
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Argumentos de build para configurar URLs
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Next.js coleta dados de telemetria anônimos sobre uso geral.
# Saiba mais aqui: https://nextjs.org/telemetry
# Desabilitar durante build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Imagem de produção, copiar todos os arquivos e rodar next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Desabilitar telemetria durante runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Criar pasta public e copiar arquivos se existirem
RUN mkdir -p ./public
COPY --from=builder /app/public ./public

# Definir permissões corretas para cache do Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar automaticamente arquivos de output do Next.js
# Aproveitar output traces para reduzir tamanho da imagem
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
