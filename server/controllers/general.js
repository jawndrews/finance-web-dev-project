import User from "../models/User.js";
import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";

// @desc get dashboard stats
// @route GET /dashboard
// @access private
export const getDashboardStats = async (req, res) => {
  try {
    //members overview
    const totalMembers = await User.countDocuments();

    // payments
    // recent payments
    const payments = await Payment.find().limit(50).sort({ createdAt: -1 });
    const totalPayments = await User.countDocuments();

    const totalIncome = "";
    const totalOutstanding = "";

    res.status(200).json({
      payments,
      totalPayments,
      totalMembers,
      totalIncome,
      totalOutstanding,
    });
  } catch (error) {
    res.status(404).json({ message: "Stats could not be loaded" });
  }
};

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
export const getUsers = async (req, res) => {
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

    const users = await User.find({
      $or: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)
      .select("-password")
      .lean();

    const total = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      users,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};
// @desc create user
// @route POST /users
// @access private
export const createUser = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    street,
    city,
    state,
    zip,
    country,
    organization,
  } = req.body;

  // validate data
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !street ||
    !city ||
    !state ||
    !zip ||
    !country ||
    !organization
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
    phoneNumber,
    city,
    state,
    zip,
    country,
    organization,
  };

  // create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res
      .status(201)
      .json({ message: `New user ${firstName} ${lastName} created.` });
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
    phoneNumber,
    street,
    city,
    state,
    zip,
    country,
  } = req.body;

  console.log(req.body);

  // validate data
  if (
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !street ||
    !city ||
    !state ||
    !zip ||
    !country
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
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

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.phoneNumber = phoneNumber;
  user.street = street;
  user.city = city;
  user.state = state;
  user.zip = zip;
  user.country = country;

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
