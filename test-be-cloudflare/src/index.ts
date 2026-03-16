import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppBindings } from './env';
import health from './routes/health';
import tasksRouter from './routes/tasks';

const app = new Hono<AppBindings>();

app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.get('/', (c) => {
  return c.json({
    name: 'multi-tenant-task-api',
    status: 'running',
  });
});

app.route('/health', health);
app.route('/tasks', tasksRouter);

export default app;