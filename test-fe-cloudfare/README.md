This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Frontend

Aplicación frontend construida con **Next.js** que consume la API del backend.

Permite gestionar tareas para múltiples tenants.

Cada tenant ve únicamente sus propias tareas.

# Variables de entorno

Archivo `.env.local`

# Setup local paso a paso

## 1. Entrar a la carpeta del frontend

```bash
cd test-fe-cloudfare
```

## 2. Instalar dependencias

pnpm install

## 3. Crear archivos de entornos si no los tienes

```bash
cp .env.local.example .env.local
```

## 4. Levantar frontend, pero antes estar seguro de tener levantado el backend en los puertos correctos (8787 o 8788)

pnpm dev
