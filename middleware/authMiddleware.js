import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../Errors/customErrors.js";
import { verifyJWT } from "../util/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authenticate invalid");
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId == "64edf5ce9937c729aec78e04";
    // console.log(req.user);
    req.user = { userId, role, testUser };
    // console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("authenticate invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this role");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
