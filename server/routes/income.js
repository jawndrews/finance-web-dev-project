import express from "express";
import { getPayments, getInvoices } from "../controllers/income.js";

const router = express.Router();

router.get("/payments", getPayments);
router.get("/invoices", getInvoices);
router.get("/transactions");

export default router;
