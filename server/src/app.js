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
import "./services/jwtStrategy.js";
import "./services/googleStrategy.js";
import "./services/localStrategy.js";

// router imports
import localAuthRouter from "./routes/localAuth.routes.js";
import taskRouter from "./routes/task.routes.js";
import googleAuthRouter from "./routes/googleAuth.routes.js";

// routes decleration
app.use("/api/auth", localAuthRouter);
app.use("/api/auth", googleAuthRouter);
app.use("/api/tasks", taskRouter);

export { app };
