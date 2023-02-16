import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    recurring: {
      type: Boolean,
      required: true,
    },
    lateFee: {
      type: Number,
    },
    users: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
