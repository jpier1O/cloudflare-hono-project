import { and, desc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';
import { getDb } from '../db/client';
import { taskStatuses, tasks } from '../db/schema';
import type { AppBindings } from '../env';
import { authMiddleware } from '../middleware/auth';
import { createTaskRateLimit } from '../middleware/rate-limit';

const tasksRouter = new Hono<AppBindings>();

const createTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(200),
    status: z.enum(taskStatuses).default('pending'),
  })
  .strict();

const taskIdSchema = z.string().uuid('Task id must be a valid UUID');

tasksRouter.use('*', authMiddleware);

tasksRouter.get('/', async (c) => {
  try {
    const db = getDb(c.env.DATABASE_URL);
    const tenantId = c.get('tenantId');

    const tenantTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.tenantId, tenantId))
      .orderBy(desc(tasks.createdAt));

    return c.json(tenantTasks, 200);
  } catch (error) {
    console.error('GET /tasks failed', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

tasksRouter.post('/', createTaskRateLimit, async (c) => {
  try {
    const body = await c.req.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          error: 'Invalid payload',
          details: parsed.error.flatten(),
        },
        400,
      );
    }

    const db = getDb(c.env.DATABASE_URL);
    const tenantId = c.get('tenantId');

    const [createdTask] = await db
      .insert(tasks)
      .values({
        title: parsed.data.title,
        status: parsed.data.status,
        tenantId,
      })
      .returning();

    return c.json(createdTask, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }

    console.error('POST /tasks failed', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

tasksRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const parsedId = taskIdSchema.safeParse(id);

  if (!parsedId.success) {
    return c.json({ error: 'Invalid task id' }, 400);
  }

  try {
    const db = getDb(c.env.DATABASE_URL);
    const tenantId = c.get('tenantId');

    const deletedTasks = await db
      .delete(tasks)
      .where(and(eq(tasks.id, parsedId.data), eq(tasks.tenantId, tenantId)))
      .returning({ id: tasks.id });

    if (deletedTasks.length === 0) {
      return c.json({ error: 'Task not found' }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    console.error('DELETE /tasks/:id failed', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default tasksRouter;