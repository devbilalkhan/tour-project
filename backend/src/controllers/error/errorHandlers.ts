import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

const sendErrorDev = (
  err: any,
  stack: string,
  message: string,
  res: Response
): void => {
  //   console.log(err);

  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    error: err,
    stack: stack,
  });
};
const sendErrorProd = (err: any, message: string, res: Response): void => {
  res.status(err.statusCode).send({
    status: err.status,
    message,
  });
};

const handleDuplicateDBFields = (err: any) => {
  //   const value = err.message.match(/(["'])(\\?.)*?/)[0];

  const message = `Duplicate Field: ${Object.keys(
    err.keyValue
  )} ${Object.values(err.keyValue)} already exists.`;
  return new AppError(message, 400);
};

const handleValidationError = (err: any) => {
  const error = Object.values(err.errors).map((el: any) => el.message);
  const message = error.join(".");
  return new AppError(message, 400);
};

const handleAuthError = (err: any) => {
  return new AppError("Unauthorised access. Please log in!", 401);
};

const handleAuthExpiredError = (err: any) => {
  return new AppError("Your token is expired. Plean login again", 401);
};
export const handleOperationalErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  // Operational errors: trusted error and can be send to client
  let error = { ...err };

  // cast error - invalid id
  if (error.path === "_id")
    error = new AppError(
      `${err.path} with value ${err.value} does not exist`,
      400
    );

  // duplicate field error
  if (error.code === 11000) {
    error = handleDuplicateDBFields(error);
  }
  // if (error.code === 11000) console.log(error.code);

  //Mongoose validation error
  if (error._message?.includes("validation failed")) {
    error = handleValidationError(error);
  }

  if (error.name === "JsonWebTokenError") error = handleAuthError(error);
  if (error.name === "TokenExpiredError") error = handleAuthExpiredError(error);

  if (process.env.NODE_ENV === "development") {
    // const error = handleDuplicateDBFields(err);
    sendErrorDev(error, err.stack, err.message, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(error, err.message, res);
  }
  // if (err.isOperational) {
  //   res.status(err.statusCode).send({
  //     status: err.status,
  //     message: err.message,
  //   });
  //   // programming or other unknown errors
  // }

  return next();
};
