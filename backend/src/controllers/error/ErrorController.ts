import { all, controller } from "../decorators";
import { Request, Response } from "express";
import { AppError } from "./AppError";

@controller("")
export class ErrorController {
  //handle anything else routes
  @all("*")
  handleErrors(req: Request, res: Response): void {
    //handle all other route errors

    const error = new AppError(
      `Can't find ${req.originalUrl} on this server`,
      404
    );
    res.status(404).json({
      error: {
        status: "fail",
        message: error.message,
      },
    });
  }
}
