import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExsists = await User.findOne({ email });

  if (userExsists) {
    res.status(400); // 400 means Bad Request
    throw new error('user already exsists');
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({ // 201 means "Created"
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new error("Invalid user data")
  }
})

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */

const authUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401) // 401 means Unauthorized
    throw new error('Invalid email or password')
  }
})

export { registerUser, authUser };