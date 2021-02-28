import { Request, Response, NextFunction } from "express";
import {
  getTours,
  getTour,
  aliasTopTours,
  tourStats,
  monthlyPlan,
  createNewTour,
  updateIndividualTour,
  delIndividualTour,
  protect,
} from "../handlers/";
import { get, controller, post, patch, del } from "../decorators";
import { use } from "../decorators/use";

interface RequestWithBody extends Request {
  body: { [key: string]: string | number };
}
@controller("/api/v1/tours")
export class TourController {
  @get("/")
  @use(protect)
  async getAllTours(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await getTours(req, res, next).catch((err) => next(err));
  }
  @get("/top-five-cheap")
  @use(protect)
  @use(aliasTopTours)
  async getfivecheap(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await getTours(req, res, next).catch((err) => next(err));
  }

  @get("/tour-stats")
  @use(protect)
  async getTourStats(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    tourStats(req, res, next).catch((err) => next(err));
  }
  @get("/monthly-plan/:year")
  @use(protect)
  async getMonthlyPlan(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    monthlyPlan(req, res).catch((err) => next(err));
  }
  @post("/")
  @use(protect)
  async createTour(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    createNewTour(req, res, next).catch((err) => next(err));
  }

  @patch("/:id")
  @use(protect)
  async updateTour(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    updateIndividualTour(req, res).catch((err) => next(err));
  }

  @del("/:id")
  @use(protect)
  async deleteTour(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    delIndividualTour(req, res, next).catch((err) => next(err));
  }
  @get("/:id")
  getSingleTour(req: RequestWithBody, res: Response, next: NextFunction): void {
    getTour(req, res, next).catch((err) => next(err));
  }
}
