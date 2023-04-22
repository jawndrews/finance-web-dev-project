import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/general.js";

const router = express.Router();

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

export default router;
