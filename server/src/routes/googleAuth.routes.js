import { Router } from "express";
import passport from "passport";
import { ApiResponse } from "../utils/apiResponse.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const accessToken = req.user.generateAccessToken();

    const option = {
      httpOnly: true,
      secure: true,
    };

    const userData = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user?.avatar,
    };

    return res.cookie("accessToken", accessToken, option).redirect(clientUrl);
  }
);

export default router;
