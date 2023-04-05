import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/general.js";

const router = express.Router();

router
  .route("/")

  .get(getAllUsers)

  .post(createUser)

  .patch(updateUser)

  .delete(deleteUser);

export default router;
