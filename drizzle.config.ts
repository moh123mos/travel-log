import { defineConfig } from "drizzle-kit";

import env from "./app/lib/env";

export default defineConfig({
  schema: "./app/lib/db/schema/index.ts",
  out: "./app/lib/db/migrations",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
