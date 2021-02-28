import "reflect-metadata";
/**
 * Factory decorators
 */
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      desc: RouteHandlerDescriptor
    ): void {
      // associating metadata with the routehandler (getAllTours)
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const del = routeBinder(Methods.DEL);
export const put = routeBinder(Methods.PUT);
export const patch = routeBinder(Methods.PATCH);
export const all = routeBinder(Methods.ALL);
