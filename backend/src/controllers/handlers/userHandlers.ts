import { Request, Response, NextFunction } from "express";
import APIFeatures from "../../utils/apiFeatures";
import { AppError } from "../error/AppError";
import { assignToken } from "./authHandler";
const User = require("../../models/userModel");

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const features = await new APIFeatures(User.find(), req.body);
  features.filter().sort().limitFields().paginate();
  const users: any = await features.query;

  if (!users) next(new AppError("No record of users", 200));
  res
    .status(200)
    .json({ status: "success", size: users.length, data: { users } });
  return;
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // the following method of creating a new user prevents anyone who is not admin
  // to add an additional row/key
  //   const user = await User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //     // confirmation: req.body.confirmation,
  //   });
  const user = await User.create(req.body);
  const token = assignToken(user._id);
  if (!user) next(new AppError("User is not created", 404));
  res.status(200).json({ status: "success", token, data: { user } });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  //check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  //check if user exists and password is correct
  // select("+password") is used to retrieve the password from the database
  //because in the model we initialized it to not to be returned to the client
  const user = await User.findOne({ email }).select("+password");
  //   const correct = await user.correctPassword(password, user.password)
  //keeping it vague
  //we move the 'correct check' inside the conditional because if the user
  // doesnt exits then user.password parameter will be undefined
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = assignToken(user._id);
  // if everything is ok then send token to the client
  res.status(200).json({ status: "success", token });
};
