import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

import { User } from "../models/user.model.js";

const isProduction = process.env.NODE_ENV === "production";
const secretOrKey = isProduction
  ? process.env.JWT_SECRET_PROD
  : process.env.JWT_SECRET_DEV;

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  }
  return token;
};

// JWT strategy
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id).select("-password");

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(jwtLogin);
