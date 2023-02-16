import express from "express";
import { getPayments } from "../controllers/income.js";

const router = express.Router();

router.get("/payments", getPayments);

export default router;
