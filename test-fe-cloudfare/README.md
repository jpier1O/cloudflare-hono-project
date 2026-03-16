# Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Frontend app built with **Next.js** that consumes the backend API. It lets you manage tasks for multiple tenants; each tenant only sees their own tasks.

## Getting started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Use the `.env.local` file for local configuration.

## Local setup (step by step)

1. **Go to the frontend folder**

   ```bash
   cd test-fe-cloudfare
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create env files** (if you don’t have them)

   ```bash
   cp .env.local.example .env.local
   ```

4. **Start the frontend**  
   Make sure the backend is running on the correct port (8787 or 8788) first.

   ```bash
   pnpm dev
   ```
