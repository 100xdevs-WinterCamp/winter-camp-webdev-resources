// src/controllers/auth.controller.ts
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { signinSchema, signupSchema } from "../utils/validation";
import { createSession, clearSession } from "../utils/session";
import { sendWelcomeEmail } from "../lib/email";

export async function signup(req: Request, res: Response) {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const { username, email, password } = result.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });

  const welcomeEmail = await sendWelcomeEmail(user.email, user.username);

  createSession(res, user.id);

  res.status(201).json({
    user: { id: user.id, username: user.username, email: user.email },
    welcomeEmail,
  });
}

export async function signin(req: Request, res: Response) {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  createSession(res, user.id);

  res.json({
    user: { id: user.id, username: user.username, email: user.email },
  });
}

export async function me(req: Request, res: Response) {
  const user = await User.findById(req.userId);

  if (!user) {
    clearSession(res);
    return res.status(401).json({ message: "Please sign in again" });
  }

  res.json({
    user: { id: user.id, username: user.username, email: user.email },
  });
}

export function logout(req: Request, res: Response) {
  clearSession(res);
  res.json({ message: "Signed out" });
}