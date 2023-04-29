import User from "../models/User.js";
import Payment from "../models/Payment.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";

// @desc get dashboard stats
// @route GET /dashboard
// @access private
export const getDashboardStats = async (req, res) => {
  try {
    // members
    // members overview
    const totalMembers = await User.countDocuments();

    // payments
    const totalPayments = await User.countDocuments();

    const allPayments = await Payment.find({});

    const sortedPayments = allPayments.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    const recentPayments = sortedPayments.slice(0, 50);

    const totalIncome = await allPayments.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    function getCurrentMonthPayments(payments) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      return payments.filter((payment) => {
        const paymentDate = new Date(payment.date);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      });
    }

    const currentMonthPayments = getCurrentMonthPayments(allPayments);

    const monthlyIncome = currentMonthPayments.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    const paymentsPopulated = await Payment.find().populate("invoiceId");
    const incomeByCategory = {};
    paymentsPopulated.forEach((payment) => {
      const category = payment.invoiceId.description || "Unknown";
      if (incomeByCategory[category]) {
        incomeByCategory[category] += payment.amount;
      } else {
        incomeByCategory[category] = payment.amount;
      }
    });
    const pieChartData = Object.entries(incomeByCategory).map(
      ([label, value], index) => ({
        id: `category${index}`,
        label,
        value,
      })
    );

    // invoices
    //const totalOutstandingInvoices = await Invoice.countDocuments(); // showing all invoice, must update

    res.status(200).json({
      totalMembers,
      recentPayments,
      totalPayments,
      allPayments,
      totalIncome,
      //totalOutstandingInvoices,
      monthlyIncome,
      pieChartData,
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
    dob,
    organization,
    active,
    memberEndDate,
    userType,
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
    !dob ||
    !organization ||
    !active ||
    !memberEndDate ||
    !userType
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
    dob,
    organization,
    active,
    memberEndDate,
    userType,
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
    dob,
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
    !country ||
    !dob
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
  user.dob = dob;

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
