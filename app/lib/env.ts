import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  TURSO_DATABASE_URL: z.string().url(),
});

export type envSchema = z.infer<typeof envSchema>;

tryParseEnv(envSchema);

// eslint-disable-next-line node/no-process-env
export default envSchema.parse(process.env);
