import express from "express";
import {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getInvoice,
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/income.js";

const router = express.Router();

router.get("/payments/:id", getPayment);
router.get("/payments", getPayments);
router.post("/payments", createPayment);
router.patch("/payments", updatePayment);
router.delete("/payments", deletePayment);

router.get("/invoices/:id", getInvoice);
router.get("/invoices", getInvoices);
router.post("/invoices", createInvoice);
router.patch("/invoices", updateInvoice);
router.delete("/invoices", deleteInvoice);

router.get("/transactions");

export default router;
