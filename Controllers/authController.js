import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  // Don't send back the password in the response
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  res.json({ message: "User created successfully", user: userResponse });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid email or password." });
  }

  // Validate password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.json({ message: "Invalid email or password." });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// Get all users
export const getUsers = async (req, res) => {
  const users = await User.find({}, "-password"); // Exclude passwords
  res.json(users);
};

// Get single user by ID
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id, "-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true, select: "-password" } // exclude password
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User updated successfully", user: updatedUser });
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};
