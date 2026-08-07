// ========================================
// Prisma Configuration (Prisma v7)
// Datasource and migration settings
// ========================================

import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env.local (Next.js convention)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
});
