import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export type envSchema = z.infer<typeof envSchema>;

tryParseEnv(envSchema);

// eslint-disable-next-line node/no-process-env
export default envSchema.parse(process.env);
