import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
export function use(middleware: RequestHandler) {
  return function (
    target: any,
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    desc: RouteHandlerDescriptor
  ): any {
    //assigning all the middlewares to an array
    const middlewares =
      Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.MIDDLEWARE,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
