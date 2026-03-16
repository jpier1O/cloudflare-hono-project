import type { MiddlewareHandler } from 'hono';
import type { AppBindings } from '../env';
import { getTenantFromToken } from '../lib/tenants';

export const authMiddleware: MiddlewareHandler<AppBindings> = async (
  c,
  next,
) => {
  const authorization = c.req.header('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authorization.replace('Bearer ', '').trim();

  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const tenantId = getTenantFromToken(token, c.env);

  if (!tenantId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('token', token);
  c.set('tenantId', tenantId);

  await next();
};