import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    amount: Number,
    title: String,
    description: String,
    recurring: Boolean,
    lateFee: Number,
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
