import { asyncHandler } from "../utils/asyncHandler.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { zodErrorHandler } from "../utils/zodError.js";

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const requestBody = req.body;

  const result = signUpSchema.safeParse(requestBody);

  if (!result.success) {
    let fieldErrorsCombined = zodErrorHandler(result);

    throw new ApiError(409, fieldErrorsCombined);
  }

  const { email, password, name, username } = requestBody;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
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

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(new ApiResponse(200, userData, "User logged in successfully"));
});

// Log out the user
const logoutUser = asyncHandler(async (req, res) => {
  // this make the cookie only modified by the server
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "User logged out"));
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "User not found !!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
