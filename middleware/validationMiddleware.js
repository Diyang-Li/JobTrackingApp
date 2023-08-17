import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../util/constants.js";
import mongoose from "mongoose";

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
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid MongoDB id"),
]);
