# Backend — Cloudflare Workers / Hono / Drizzle

Multi-tenant API for task management.

## Environment variables

### `.dev.vars`

Used by Wrangler for local development.

### `.env`

Used by **Drizzle CLI** for running migrations.

```env
DATABASE_URL=postgresql://app_user:app_password@localhost:5433/task_manager
TOKEN_TENANT_A=tenant-a-local-token
TOKEN_TENANT_B=tenant-b-local-token
```

---

## Run locally

```bash
pnpm install
pnpm dev
```

## Deploy

```bash
pnpm deploy
```

## Generate Cloudflare types

[For generating/synchronizing types based on your Worker configuration](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```bash
pnpm cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

---

## Local setup (step by step)

1. **Go to the backend folder**

   ```bash
   cd test-be-cloudflare
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create env files**

   ```bash
   cp .dev.vars.example .dev.vars
   cp .env.example .env
   ```

4. **Ensure the database is running with Docker** (from project root: `docker compose up -d`).

5. **Apply the schema to the database**

   ```bash
   pnpm db:push
   ```

6. **Start the dev server**  
   Backend runs at `http://localhost:8787`. If there are port conflicts, use 8788.

   ```bash
   pnpm dev
   ```

7. **Test the endpoint**

   ```bash
   curl http://localhost:8787/health
   ```

## Deploy to Cloudflare

Use `pnpm deploy` when ready to deploy to Cloudflare.
