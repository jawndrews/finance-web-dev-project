import express from "express";
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);

router
  .route("/")

  .get(getAllUsers)

  .post(createUser)

  .patch(updateUser)

  .delete(deleteUser);

export default router;
