import { Schema, Model, Date } from "mongoose";
import { TourInterface } from "../types/index";
const mongoose = require("mongoose");

const tourSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      minLength: [5, "Name to short"],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have difficulty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have an Image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// a virtual is a property that is not persisted in MongoDB
// it can be used as a helper tool to achieve some another task

// need to add a type annotation for 'this': 'any' or something more
// specific to tell typescript you did not mistakenly access 'this'
tourSchema.virtual("durationWeeks").get(function (this: TourInterface) {
  return Math.floor(this.duration / 7);
});
const Tour: Model<TourInterface> = mongoose.model(
  "my first tour models",
  tourSchema
);

module.exports = Tour;
