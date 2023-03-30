import express from "express";
import { getMembers } from "../controllers/management.js";

const router = express.Router();

router.get("/members", getMembers);
router.get("/events");
router.get("/communication");
router.get("/reports");
router.get("/collections");

export default router;
