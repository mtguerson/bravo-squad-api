import { pgTable, text } from 'drizzle-orm/pg-core';

export const playersTable = pgTable('players', {
  id: text().primaryKey().unique().notNull(),
  name: text().notNull(),
});
