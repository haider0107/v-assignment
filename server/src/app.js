import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(passport.initialize());
require("./services/jwtStrategy");
require("./services/googleStrategy");
require("./services/localStrategy");

// router imports
// import userRouter from "./routes/user.routes.js";

// routes decleration
// app.use("/api/v1/users", userRouter);

export { app };
