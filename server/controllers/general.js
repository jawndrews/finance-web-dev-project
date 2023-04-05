import User from "../models/User.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";

// @desc get user
// @route GET /users
// @access private
export const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc get all users
// @route GET /users
// @access private
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc create user
// @route POST /users
// @access private
export const createUser = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    city,
    state,
    country,
    phoneNumber,
  } = req.body;

  // validate data
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !city ||
    !state ||
    !country ||
    !phoneNumber
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check duplicates
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Account with that email already exists" });
  }

  // hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    firstName,
    lastName,
    email,
    password: hashedPwd,
    city,
    state,
    country,
    phoneNumber,
  };

  // create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res
      .status(201)
      .json({ message: `New user ${firstName} ${lastName} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc update user
// @route PATCH /users
// @access private
export const updateUser = expressAsyncHandler(async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    city,
    state,
    country,
    phoneNumber,
    userType,
  } = req.body;

  // validate data
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !city ||
    !state ||
    !country ||
    !phoneNumber ||
    !userType
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // check duplicates
  const duplicate = await User.findOne({ email }).lean().exec();
  // allow updates to the original user!
  if (duplicate && duplicate?._id.toString() !== id) {
    return res
      .status(409)
      .json({ message: "Account with that email already exists" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.city = city;
  user.state = state;
  user.country = country;
  user.phoneNumber = phoneNumber;
  user.userType = userType;

  if (password) {
    // hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    message: `${updatedUser.firstName} ${updatedUser.lastName} updated`,
  });
});

// @desc delete user
// @route DELETE /users
// @access private
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `${result.firstName} ${result.lastName} deleted`;

  res.json(reply);
});
