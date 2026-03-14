import { Hono } from 'hono';
import type { Bindings } from './env';
import health from './routes/health';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.json({
    name: 'multi-tenant-task-api',
    status: 'running',
  });
});

app.route('/health', health);

export default app;