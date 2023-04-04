import express from "express";
import { getAuth } from "../controllers/auth.js";

const router = express.Router();

router.route("/").post();

router.route("/refresh").get();

router.route("/logout").post();

export default router;
