import User from "../models/user.js";
import { registrationWelcome } from "../mail/index.js";
import bicrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
  return res
    .status(500)
    .json({ message: "error occured while adding new users" });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload an avatar image" });
  }
  const imageUrl = "/images/" + file.filename;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const salt = await bicrypt.genSalt(10);
    const hashedPassword = await bicrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    });
    await newUser.save();
    // try {
    //   await registrationWelcome(email, name);
    // } catch (emailErr) {
    //   console.error("EMAIL ERROR:", emailErr);
    // }
    return res.status(201).json(newUser);
  } catch (err) {
    console.error("USER CREATE ERROR:", err);
    return res
      .status(500)
      .json({ message: "Error occurred while adding new user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findOneAndUpdate({ _id }, { email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user deleted successfully", user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "error deleting user", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordValid = await bicrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "user logged in successfully", user, token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "error logging in user", error: err.message });
  }
};
