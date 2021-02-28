import { Request, Response, NextFunction } from "express";
import { controller, get, post } from "../decorators";
import { bodyValidator } from "../decorators";
import { getUsers, createUser, login } from "../handlers/userHandlers";
import { YUser as validateDto } from "../../dto/validate";
import { use } from "../decorators/use";

interface RequestWithBody extends Request {
  body: { [key: string]: string | number };
}

@controller("/api/v1/users")
export class UserController {
  @post("/signup")
  @bodyValidator(validateDto)
  //   @use(login)
  async signup(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await createUser(req, res, next).catch((err) => next(err));
  }
  @post("/login")
  async userLogin(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await login(req, res, next).catch((err) => next(err));
  }

  @get("/")
  async getUsers(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await getUsers(req, res, next).catch((err) => next(err));
  }
}
