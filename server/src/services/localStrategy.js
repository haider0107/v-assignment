import passport from "passport";
import { Strategy as PassportLocalStrategy } from "passport-local";

import { User } from "../models/user.model.js";
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
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Email does not exists." });
      }

      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Email or Password incorret" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(passportLogin);
