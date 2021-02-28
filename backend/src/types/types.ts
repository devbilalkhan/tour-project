import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
export interface TourInterface extends Document {
  name: string;
  duration: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  maxGroupSize: number;
  price: number;
  priceDiscount?: number;
  difficulty: string;
  description: string;
  summary?: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  startDates?: Date[];
}
export interface IRequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export type IHandler = (
  req: IRequestWithBody,
  res: Response,
  next: NextFunction,
  value?: string
) => ReturnFilter;
export type TourDocument = TourInterface & Document;
export type ReturnFilter = void | NextFunction | Promise<void>;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string | undefined;
  photo?: string;
  passwordChangedAt: Date;
}

export enum ICodes {
  SUCCESS = 200,
  CREARED = 201,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}
