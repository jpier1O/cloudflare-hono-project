import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const taskStatuses = ['pending', 'done'] as const;
export type TaskStatus = (typeof taskStatuses)[number];

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  status: text('status').$type<TaskStatus>().notNull().default('pending'),
  tenantId: text('tenant_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});