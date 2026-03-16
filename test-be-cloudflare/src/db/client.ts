import { drizzle } from 'drizzle-orm/node-postgres';

export function getDb(databaseUrl: string) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing');
  }

  return drizzle(databaseUrl);
}