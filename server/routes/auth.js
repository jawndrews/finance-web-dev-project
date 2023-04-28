import express from "express";
import { login, refresh, logout, register } from "../controllers/auth.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", /*loginLimiter -- taken out for development*/ login);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.post("/register", register);

export default router;
