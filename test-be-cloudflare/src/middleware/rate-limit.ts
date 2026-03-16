import type { MiddlewareHandler } from 'hono';
import type { AppBindings } from '../env';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

export const createTaskRateLimit: MiddlewareHandler<AppBindings> = async (
  c,
  next,
) => {
  const token = c.get('token');
  const now = Date.now();

  const validTimestamps = (requestLog.get(token) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (validTimestamps.length >= MAX_REQUESTS) {
    return c.json({ error: 'Too many requests' }, 429);
  }

  validTimestamps.push(now);
  requestLog.set(token, validTimestamps);

  await next();
};