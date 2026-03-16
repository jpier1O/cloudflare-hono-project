# Multi-tenant Task Manager

Sample project implementing a **multi-tenant** task system.

Each tenant has its own tasks and cannot see other tenants' tasks.

The project is split into two applications:

- **Backend:** Cloudflare Workers / Hono / Drizzle ORM / PostgreSQL
- **Frontend:** Next.js / TypeScript / Tailwind CSS / TanStack Query

The database runs **locally with Docker** for easier development.

---

## Project structure

```txt
.
├── test-be-cloudflare/
├── test-fe-cloudfare/
├── docker-compose.yml
└── README.md


---

## Requirements

Before you begin, you need:

- Node.js **20+**
- pnpm
- Docker Desktop
- Git

---

## Local database (Docker)

The project uses **PostgreSQL** running in a Docker container so anyone can start the database without installing PostgreSQL manually.

From the project root, start the database with:

```bash
docker compose up -d
```

This starts a `task-manager-postgres` container. The database is available at `localhost:5433`.

### Default database credentials

- **database:** task_manager
- **user:** app_user
- **password:** app_password

See the backend and frontend READMEs for full setup. The frontend app is deployed on Vercel.

---

## Response of answers
1. How would you approach implementing DMARC and DKIM configuration for
a platform hosted on Cloudflare? What is the purpose of each?

I would configure the DKIM and DMARC by adding the records from DKIM provided by the email service and create a record TXT (dns). I would use a policy to monitor things and validate by statuses once validation of auth is completed.

2. A user reports they can see tasks that don't belong to them. Walk us
through how you would debug and fix this in a multi-tenant system.

First I would try replicate the bug, check the logging, understand what if the flow that the user follows, tenant of the user, the issue occurs in all users of specific users. I would review the auth middleware and if the BE pass through correctly to the requests.
Another that I would do could be if the endpoint is filter correctly and check the share caching between tenants maybe. My last step would be review the FE code.

3. What would your automated daily database backup strategy look like for a
Neon Postgres database? How would you verify it's working?

I would do maybe a daily or weekly backup, maybe use a service of aws like s3 and their configuration s3 glacier or another, because this type of s3 handle different policies of retention of the data and zip or compress the dump to save storage.

I build a process to automate the backup (I have experience with github actions or eventbridge for this) ask to the team of the client the policy of retention (15-30 days) and ask him if we should delete the oldest and have logs to check if the backup is completed of fail, maybe we should use Neon branching (simplify the process of recovery), this help in encryption of backups