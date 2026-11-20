// src/utils/session.ts
import type { Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

export const COOKIE_NAME = "session";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function createSession(res: Response, userId: string) {
  const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
}

export function clearSession(res: Response) {
  res.clearCookie(COOKIE_NAME, cookieOptions);
}