import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import expressAsyncHandler from "express-async-handler";

export const getPayment = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({ message: "Payment not found" });
  }
});

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
      $in: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .populate("userId")
      .populate("invoiceId")
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
  const { id, amount, paymentType, userId, invoiceId } = req.body;

  // Confirm data
  if (!amount || !paymentType || !userId || !invoiceId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const payment = await Payment.create({
    amount,
    paymentType,
    userId,
    invoiceId,
  });

  // Populate user and invoice data in the created payment document
  await payment.populate("userId").populate("invoiceId").execPopulate();

  if (payment) {
    return res.status(201).json({ message: "New payment created" });
  } else {
    return res.status(400).json({ message: "Invalid payment data received" });
  }
});

export const updatePayment = expressAsyncHandler(async (req, res) => {
  const { id, amount, paymentType, userId, invoiceId } = req.body;

  // Confirm data
  if (!id || !amount || !paymentType || !userId || !invoiceId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm payment exists to update
  const payment = await Payment.findById(id).exec();

  if (!payment) {
    return res.status(400).json({ message: "Payment not found" });
  }

  payment.amount = amount;
  payment.paymentType = paymentType;
  payment.userId = userId;
  payment.invoiceId = invoiceId;

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
  const payment = await Note.findById(id).exec();

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
    const invoice = await Invoice.findById(id);
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
      $in: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .populate("userId")
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Invoice.countDocuments({
      name: { $regex: search, $options: "i" },
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
  const { amount, title, description, recurring, lateFee, userId } = req.body;

  // Confirm data
  if (
    !amount ||
    !title ||
    !description ||
    typeof recurring !== "boolean" ||
    !lateFee ||
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
    userId,
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
  const { id, amount, title, description, recurring, lateFee, userId } =
    req.body;

  // Confirm data
  if (
    !id ||
    !amount ||
    !title ||
    !description ||
    typeof recurring !== "boolean" ||
    !lateFee ||
    !invoiceId
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
  invoice.userId = userId;

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

  const reply = `Invoice "'${result.title}'" with ID ${result._id} deleted`;

  res.json(reply);
});
