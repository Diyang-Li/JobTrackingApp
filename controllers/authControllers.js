import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { hashPassword, comparePassword } from "../util/passwordUtils.js";
import { UnauthenticatedError } from "../Errors/customErrors.js";
export const register = async (req, res) => {
  // const jobs = await Job.find({ company: "intel" });
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};
export const login = async (req, res) => {
  // const jobs = await Job.find({ company: "intel" });
  const user = await User.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValid) {
    throw new UnauthenticatedError("invalid credentials");
  }
  res.send("login");
};
