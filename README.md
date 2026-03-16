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

