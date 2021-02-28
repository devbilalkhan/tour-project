import APIFeatures from "../../utils/apiFeatures";
import { NextFunction, Request, Response } from "express";
import { IHandler, TourDocument } from "../../types/index";
import { AppError } from "../error/AppError";
const Tour = require("../../models/tour");

// Pre-filled middleware for the top-5 cheap tours
export const aliasTopTours: IHandler = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
  return;
};

// All tours
export const getTours = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const features = new APIFeatures(Tour.find(), req.query);
  features.filter().sort().limitFields().paginate();
  const tours: TourDocument[] = await features.query;

  //For no record we dont send 404
  // soorria suggests to send an empty array
  if (!tours) {
    next(new AppError("There are no records found for any tours", 200));
    return;
  }

  res
    .status(200)
    .json({ status: "success", size: tours.length, data: { tours } });
  return;
};

export const tourStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 3.0 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        price: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { maxPrice: 1 },
    },
  ]);

  // If the object ID doesnot exist in mongodb
  if (!stats) {
    next(new AppError("Cannot find any stats for this ID", 404));
    return;
  }
  res
    .status(200)
    .json({ status: "success", size: stats.length, data: { stats } });
};

export const monthlyPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const year = req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0, //assigning to zero will ignore _id
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);
  res
    .status(200)
    .json({ status: "success", size: plan.length, data: { plan } });
};

export const createNewTour = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tour = await Tour.create(req.body);
  if (!tour) next(new AppError("A tour was not created", 404));

  res.status(201).json({ status: "success", data: { tour } });
};

export const updateIndividualTour = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tour: TourDocument[] = await Tour.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(204).json({
    status: "success",
    data: {
      tour,
    },
  });
};

export const delIndividualTour = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  // If the object ID doesnot exist
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: { message: "Tour deleted" },
  });
};

export const getTour = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tour: TourDocument[] = await Tour.findById(req.params.id);
  // If the object ID doesnot exist
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({ status: "success", data: { tour } });
};
