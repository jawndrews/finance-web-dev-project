import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
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
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
