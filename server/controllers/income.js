import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import expressAsyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id)
      .populate("userId")
      .populate("invoiceId");
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({ message: "Payment not found" });
  }
};

// payments
export const getPayments = async (req, res) => {
  try {
    // pagination
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const payments = await Payment.find({
      $or: [{ paymentType: { $regex: new RegExp(search, "i") } }],
    })
      .populate("userId")
      .populate("invoiceId")
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Payment.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      payments,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};

export const createPayment = expressAsyncHandler(async (req, res) => {
  const { amount, paymentType, userId, invoiceId, date } = req.body;

  // Confirm data
  if (!amount || !paymentType || !userId || !invoiceId || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const payment = await Payment.create({
    amount,
    paymentType,
    userId: ObjectId(userId),
    invoiceId: ObjectId(invoiceId),
    date,
  });

  if (payment) {
    // Update invoice with new payment
    const invoice = await Invoice.findById(invoiceId).exec();

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.payments.push(payment);
    await invoice.save();

    return res.status(201).json({ message: "New payment created" });
  } else {
    return res.status(400).json({ message: "Invalid payment data received" });
  }
});

export const updatePayment = expressAsyncHandler(async (req, res) => {
  const { id, amount, paymentType, userId, invoiceId, date } = req.body;

  // Confirm data
  if (!id || !amount || !paymentType || !userId || !invoiceId || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm payment exists to update
  const payment = await Payment.findById(id).exec();

  if (!payment) {
    return res.status(400).json({ message: "Payment not found" });
  }

  payment.amount = amount;
  payment.paymentType = paymentType;
  payment.userId = ObjectId(userId);
  payment.invoiceId = ObjectId(invoiceId);
  payment.date = date;

  const updatedPayment = await payment.save();

  res.json(`Payment with ID '${updatedPayment.id}' updated`);
});

export const deletePayment = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Payment ID required" });
  }

  // Confirm payment exists to delete
  const payment = await Payment.findById(id).exec();

  if (!payment) {
    return res.status(400).json({ message: "Payment not found" });
  }

  const result = await payment.deleteOne();

  const reply = `Payment with ID ${result._id} deleted`;

  res.json(reply);
});

export const getInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate("payments")
      .populate("userId");
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: "Invoice not found" });
  }
});

export const getInvoices = async (req, res) => {
  try {
    // pagination
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const invoices = await Invoice.find({
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ],
    })
      .populate("payments")
      .populate("userId")
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Invoice.countDocuments({
      title: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      invoices,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};

export const createInvoice = expressAsyncHandler(async (req, res) => {
  const {
    amount,
    title,
    description,
    recurring,
    lateFee,
    activeDate,
    dueDate,
    userId,
  } = req.body;

  // Confirm data
  if (
    !amount ||
    !title ||
    !description ||
    typeof recurring !== "boolean" ||
    !lateFee ||
    !activeDate ||
    !dueDate ||
    !userId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const invoiceObject = {
    amount,
    title,
    description,
    recurring,
    lateFee,
    activeDate,
    dueDate,
    userId: ObjectId(userId),
  };

  // Create and store the new invoice
  const invoice = await Invoice.create(invoiceObject);

  if (invoice) {
    // Created
    return res.status(201).json({ message: "New invoice created" });
  } else {
    return res.status(400).json({ message: "Invalid invoice data received" });
  }
});

export const updateInvoice = expressAsyncHandler(async (req, res) => {
  const {
    amount,
    title,
    description,
    recurring,
    lateFee,
    activeDate,
    dueDate,
    userId,
  } = req.body;

  // Confirm data
  if (
    !amount ||
    !title ||
    !description ||
    typeof recurring !== "boolean" ||
    !lateFee ||
    !activeDate ||
    !dueDate ||
    !userId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm invoice exists to update
  const invoice = await Invoice.findById(id).exec();

  if (!invoice) {
    return res.status(400).json({ message: "Invoice not found" });
  }

  invoice.amount = amount;
  invoice.title = title;
  invoice.descrition = description;
  invoice.recurring = recurring;
  invoice.lateFee = lateFee;
  invoice.activeDate = activeDate;
  invoice.dueDate = dueDate;
  invoice.userId = ObjectId(userId);

  const updatedInvoice = await invoice.save();

  res.json(
    `Invoice "'${updatedInvoice.title}'" with ID '${updatedInvoice.id}' updated`
  );
});

export const deleteInvoice = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Invoice ID required" });
  }

  // Confirm invoice exists to delete
  const invoice = await Invoice.findById(id).exec();

  if (!invoice) {
    return res.status(400).json({ message: "Invoice not found" });
  }

  const result = await invoice.deleteOne();

  const reply = `Invoice "'${result.title}'" with ID ${result.id} deleted`;

  res.json(reply);
});
