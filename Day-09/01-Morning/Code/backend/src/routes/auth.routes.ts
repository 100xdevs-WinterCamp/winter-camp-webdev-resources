// src/routes/auth.routes.ts
import { Router } from "express";
import { signup, signin, me, logout } from "../controllers/auth.controller";
import { requireUser } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", requireUser, me);
router.post("/logout", logout);

export default router;