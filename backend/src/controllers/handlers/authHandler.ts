import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

export const assignToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const verifyAuth = (
  token: string | undefined,
  next: NextFunction
): { id: string; iat: string } => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: any, decoded: { id: string; iat: number }) => {
      if (err) return next(err);
      return decoded;
    }
  );
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;
  //check token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );

  // token verification
  // you can also use promisify
  const decoded = verifyAuth(token, next);

  // check if the user still exists.
  // 1) what if the user is deleted in the meantime.
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError("The user belonging to token doesnot exists.", 401)
    );

  // 2) what if user changes their password after the token issued.
  // Created a mongoose middleware for changedPasswordAfter
  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  //Grant access to the protected routes
  req.body = freshUser;
  next();
};
