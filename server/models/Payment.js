import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
    },
    paymentType: {
      type: String,
    },
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
