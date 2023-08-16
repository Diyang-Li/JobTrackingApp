import { body, validationResult } from "express-validator";
import { BadRequestError } from "../Errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //   console.log(errors.isEmpty());
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        // return res.status(400).json({ errors: errorMessage });
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 5 })
    .withMessage("name must be at least 5"),
]);
