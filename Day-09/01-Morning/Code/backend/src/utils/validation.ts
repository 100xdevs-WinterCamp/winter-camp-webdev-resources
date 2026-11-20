// src/utils/validation.ts
import { z } from "zod";

export const signinSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8).max(72),
});

export const signupSchema = signinSchema.extend({
  username: z.string().trim().min(2).max(30),
});