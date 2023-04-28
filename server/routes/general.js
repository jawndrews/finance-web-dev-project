import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats,
} from "../controllers/general.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

router.get("/dashboard", getDashboardStats);

export default router;
