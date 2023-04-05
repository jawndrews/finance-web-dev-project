import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    amount: Number,
    paymentType: String,
    userId: String,
    invoiceId: String,
    userId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    invoiceId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
