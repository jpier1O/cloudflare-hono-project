import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppBindings } from './env';
import health from './routes/health';
import tasksRouter from './routes/tasks';

const app = new Hono<AppBindings>();

app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    // exposeHeaders: ['Content-Length'],
    // maxAge: 600,
  }),
);

app.get("/health", (c) => {
  return c.json({ ok: true, service: "test-cloudflare-backend" });
});

app.route('/health', health);
app.route('/tasks', tasksRouter);

export default app;