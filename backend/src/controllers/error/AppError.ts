export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    //message is the only parameter that builtin constructor accepts
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    //err.stack will show where the error happened
    // Error.captureStackTrace(this, this.constructor);
  }
}
