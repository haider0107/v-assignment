import { asyncHandler } from "../utils/asyncHandler.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const requestBody = req.body;

  const result = signUpSchema.safeParse(requestBody);

  if (!result.success) {
    let fieldErrorsCombined = zodErrorHandler(result);

    return done(null, false, { message: fieldErrorsCombined });
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

  const createdUser = await User.findById(user._id).select(
    "-password"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req,res) => {
    const token = req.user.generateJWT();
})

export { registerUser,loginUser };
