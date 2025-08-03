import { pgTable, serial, varchar, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: varchar('formData', { length: 255 }).notNull(),
  aiResponse: text('aiResponse').notNull(),
  templateSlug: varchar('templateSlug', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }), // or use `timestamp` instead if it's a date
});

export const UserSubscriptions = pgTable('userSubscriptions', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  stripeCustomerId: varchar('stripeCustomerId', { length: 255 }),
  stripeSubscriptionId: varchar('stripeSubscriptionId', { length: 255 }),
  planName: varchar('planName', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'active', 'canceled', 'past_due', etc.
  currentPeriodStart: timestamp('currentPeriodStart'),
  currentPeriodEnd: timestamp('currentPeriodEnd'),
  cancelAtPeriodEnd: boolean().default(false),
  wordLimit: integer('wordLimit').notNull().default(10000), // Free plan limit
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
