import express from "express";
import { login, refresh, logout } from "../controllers/auth.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
