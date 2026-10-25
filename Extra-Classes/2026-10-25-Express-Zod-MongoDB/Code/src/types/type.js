import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});