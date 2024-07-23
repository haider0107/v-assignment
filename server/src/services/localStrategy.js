import passport from "passport";
import { Strategy as PassportLocalStrategy } from "passport-local";

import User from "../models/User";
// import { loginSchema } from "./validators";
import { signInSchema } from "../schemas/signInSchema.js";
import { zodErrorHandler } from "../utils/zodError.js";

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
  },
  async (req, email, password, done) => {

    const requestBody = req.body;

    const result = signInSchema.safeParse(requestBody);

    if (!result.success) {
      let fieldErrorsCombined = zodErrorHandler(result);

      return done(null, false, { message: fieldErrorsCombined });
    }

    try {
      const user = await User.findOne({ email: email.trim() });
      if (!user) {
        return done(null, false, { message: "Email does not exists." });
      }

      user.isPasswordCorrect(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Email or Password incorret" });
        }

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(passportLogin);
