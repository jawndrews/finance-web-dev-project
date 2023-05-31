import express from "express";
import { getUsers, createUser } from "../controllers/general.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/members", getUsers);
router.get("/members/create", createUser);

router.get("/events");

router.get("/communication");

router.get("/reports");

router.get("/collections");

export default router;
