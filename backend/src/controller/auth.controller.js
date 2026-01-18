import User from "../Models/user.models.js";
import { ApiError } from "../utills/apiError.js";
import { asyncHandler } from "../utills/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
  // Your signup logic here
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username) {
   throw new ApiError(400, "username is required");
  }
  if (!email) {
      throw new ApiError(400, "email is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }
  if (password.length < 8) {
    throw new ApiError(400, "password must be at least 8 characters long");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //   console.log("existingUser",existingUser)
  if (existingUser) {
    throw new ApiError(400, "user is already exist");
  }

  const newUser = new User({ username, email, password });
  await newUser.save();
  return res.status(201).json({ message: "User registered successfully" });
});
export const signin = asyncHandler(async (req, res) => {
  // Your signin logic here
  console.log(req.body);
  const { email, password } = req.body;

   const existingUser = await User.findOne({ email });
   if (!existingUser) {
     throw new ApiError(400, "user does not exist");
   }
 const isPasswordMatch = await existingUser.comparePassword(password);
 if(!isPasswordMatch){
    throw new ApiError(400, "Invalid password");
 }

   const token = existingUser.generateAuthToken();

   return res.cookie("token", token, { httpOnly: true }).status(201).json({ message: "User signed in successfully", token, user: existingUser });
})