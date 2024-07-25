import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/localAuth.controllers.js";
import requireLocalAuth from "../middleware/requireLocalAuth.js";
import requireJwtAuth from "../middleware/requireJwtAuth.js";

const router = Router();

router.route("/login").post(requireLocalAuth, loginUser);

router.route("/register").post(registerUser);

router.route("/logout").post(requireJwtAuth, logoutUser);

router.route("/currentUser").get(requireJwtAuth, getCurrentUser);

export default router;
