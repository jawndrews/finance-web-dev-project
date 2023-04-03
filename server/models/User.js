import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    payments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Payment",
      },
    ],
    invoices: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
