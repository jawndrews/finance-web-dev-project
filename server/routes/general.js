import express from "express";
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/general.js";

const router = express.Router();

router.get("/users/:id", getUser);
router.get("/users", getAllUsers);
router.post("/users", createUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

export default router;
