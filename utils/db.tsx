import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const db = () => {
  if (!dbInstance) {
    if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
      throw new Error('Database URL not configured');
    }
    const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
};
