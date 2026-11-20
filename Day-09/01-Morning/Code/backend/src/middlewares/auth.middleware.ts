// src/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { COOKIE_NAME } from "../utils/session";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Please sign in" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Please sign in again" });
  }
}