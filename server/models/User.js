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
    phoneNumber: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    dob: String,
    organization: String,
    active: Boolean,
    memberStatus: String,
    memberStartDate: String,
    memberEndDate: String,
    userType: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
