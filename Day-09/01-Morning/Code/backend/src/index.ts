// src/index.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./lib/env";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

await connectDB();

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});