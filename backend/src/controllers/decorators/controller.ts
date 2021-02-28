import "reflect-metadata";
const AppRouter = require("../../routes/AppRouter");
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { AppError } from "../error/AppError";
import { IUser } from "../../types/types";

function bodyValidator(schema: IUser): RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.url === "/api/v1/users/signup") {
        const validateBody = await schema.validate(req.body);
        req.body = validateBody;
      }
      next();
    } catch (err) {
      const error = new AppError(err.message, 404);
      res.status(404).json({ error: error.message });
    }
  };
}

export function controller(routePrefix: string): any {
  return function (target: () => any) {
    //Router instance
    const router = AppRouter.getInstance();
    let key;

    //iterating class methods
    for (key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
        [];

      const validators = bodyValidator(requiredBodyProps);

      //checks if the method is associated with the route handler
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          middlewares,
          ...middlewares,
          validators,
          routeHandler
        );
      }
    }
  };
}
