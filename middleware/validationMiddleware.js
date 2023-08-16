import { body, validationResult } from "express-validator";
import { BadRequestError } from "../Errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //   console.log(errors.isEmpty());
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessage });
        // throw new BadRequestError(errorMessage);
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
