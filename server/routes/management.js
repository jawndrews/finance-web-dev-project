import express from "express";
import { getUsers } from "../controllers/general.js";

const router = express.Router();

router.get("/members", getUsers);
router.get("/events");
router.get("/communication");
router.get("/reports");
router.get("/collections");

export default router;
