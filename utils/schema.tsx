import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: varchar('formData', { length: 255 }).notNull(),
  aiResponse: text('aiResponse').notNull(),
  templateSlug: varchar('templateSlug', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }), // or use `timestamp` instead if it's a date
});
