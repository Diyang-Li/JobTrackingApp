import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../util/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors.isEmpty());
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // console.log(errorMessages);
        // return res.status(400).json({ errors: errorMessage });
        if (errorMessages[0].startsWith("no job ")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job Location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("invalid MongoDB id ");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`no job with id ${value}`);
    }
  }),
]);
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 2 })
    .withMessage("Password must be at least 8 characters"),
  body("location").notEmpty().withMessage("location is required "),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);
