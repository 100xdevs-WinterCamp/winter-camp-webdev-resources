// src/lib/db.ts
import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  await mongoose.connect(env.MONGODB_URI);
  console.log("MongoDB connected");
}