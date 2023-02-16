import User from "../models/User.js";

export const getMembers = async (req, res) => {
  try {
    const members = await User.find({ userType: "user" }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};
