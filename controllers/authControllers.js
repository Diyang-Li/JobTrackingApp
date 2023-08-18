import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { nanoid } from "nanoid";
import { body } from "express-validator";

export const register = async (req, res) => {
  // const jobs = await Job.find({ company: "intel" });
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req, res) => {
  // const jobs = await Job.find({ company: "intel" });
  res.send("login");
};
