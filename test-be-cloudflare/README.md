## Description

``md
# Backend - Cloudflare Workers / Hono / Drizzle

API multi-tenant para gestión de tareas (tasks)

## Variables de entorno

### `.dev.vars`
Usado por Wrangler para desarrollo local.


---

### `.env`

Usado por **Drizzle CLI** para ejecutar migraciones.


```env
DATABASE_URL=postgresql://app_user:app_password@localhost:5433/task_manager
TOKEN_TENANT_A=tenant-a-local-token
TOKEN_TENANT_B=tenant-b-local-token

## Run locally

```bash
pnpm install
pnpm dev
```

## Deploy

```bash
pnpm deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

## Generate Cloudflare types

```bash
pnpm cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

# Setup local paso a paso

## 1. Entrar a la carpeta del backend

```bash
cd test-be-cloudflare
```

## 2. Instalar dependencias

pnpm install

## 3. Crear archivos

cp .dev.vars.example .dev.vars
cp .env.example .env

## 4. Revisar bd levantada con docker
## 5. Aplicar el esquema a la bd

pnpm db:push

## 6. Levantar el entorno y revisar que el backend quede en localhost:8787 si hay errores modificar de 8787 a 8788

pnpm dev

## 7. Probar el endpoint curl http://localhost:8787/health

## deplegar a cloudfare