import express from "express";
import { getPayments } from "../controllers/income.js";
import { getMembers } from "../controllers/management.js";

const router = express.Router();

router.get("/payments", getPayments);
router.get("/members", getMembers);

export default router;
