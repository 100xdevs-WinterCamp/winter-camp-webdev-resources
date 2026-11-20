// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
  NODE_ENV: z.string().default("development"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("Exchange <onboarding@resend.dev>"),
});

export const env = envSchema.parse(process.env);