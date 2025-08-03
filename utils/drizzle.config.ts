import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_D3uUq4ybfABG@ep-raspy-block-ade63igh-pooler.c-2.us-east-1.aws.neon.tech/AI-Content-Generator?sslmode=require&channel_binding=require',
  },
});

//npx drizzle-kit studio --config=./utils/drizzle.config.ts 