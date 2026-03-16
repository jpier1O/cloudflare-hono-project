# Multi-tenant Task Manager

Proyecto de ejemplo que implementa un sistema de tareas **multi-tenant**.

Cada tenant tiene sus propias tareas y no puede ver las de otros tenants.

El proyecto está dividido en dos aplicaciones:

- **Backend:** Cloudflare Workers / Hono / Drizzle ORM / PostgreSQL
- **Frontend:** Next.js / TypeScript / Tailwind CSS / TanStack Query

La base de datos se levanta **localmente con Docker** para facilitar el desarrollo.

---

# Estructura del proyecto

```txt
.
├── test-be-cloudflare/
├── test-fe-cloudfare/
├── docker-compose.yml
└── README.md


---

# Requisitos

Antes de comenzar necesitas tener instalado:

- Node.js **20+**
- pnpm
- Docker Desktop
- Git

---

# Base de datos local (Docker)

El proyecto utiliza **PostgreSQL** ejecutándose en un contenedor Docker.

Esto permite que cualquier persona pueda levantar la base de datos sin instalar PostgreSQL manualmente.

Para iniciar la base de datos ejecuta desde la raíz del proyecto:

```bash
docker compose up -d

## Esto iniciara un contenedor task-manager-postgres
## La base de datos quedara disponible en localhost:5433

# Credenciales bd por defecto

database: task_manager
user: app_user
password: app_password

# Revisa los readme de fe y be para levantar el setup
# La app esta desplegada en vercel ahora para el fe


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