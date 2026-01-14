import User from "../Models/user.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";

export const signup = asyncHandler(async (req, res, next)=>{
    // Your signup logic here
     const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //   console.log("existingUser",existingUser)
  if (existingUser) {
    throw new ApiError(409, "user is already exist");
  }

     const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({message:"User registered successfully"});

}
);