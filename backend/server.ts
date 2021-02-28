import express from "express";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Need to import the controllers so the decorators can get executed.
import "./src/controllers/tours/TourController";
import "./src/controllers/users/UserController";
import "./src/controllers/error/AppError";
import "./src/controllers/error/ErrorController";
import { handleOperationalErrors } from "./src/controllers/error/errorHandlers";
// //handling uncaughtExceptions (sync types)
// process.on("uncaughtException", () => {
//   process.exit(1);
// });

dotenv.config({ path: "./config.env" });
const app = express();
const morgan = require("morgan");

app.use(express.json());
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
console.log(process.env.NODE_ENV);

//mongoose db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err: any) => console.log(err));

const AppRouter = require("./src/routes/AppRouter");

/**
 ** The decorators are executed when the class definition is read in.
 ** The  decorators will associate route configaration with the use of metadata.
 ** To associate the route handlers/methods with the router, we need to configure some
 ** metadata onto the route handler with the help of decorators.
 ** The metadata association is provided by a thirs party library called reflect-metadata.
 */
const router = AppRouter.getInstance();

app.use(router);
//If no route
app.use(handleOperationalErrors);

const server = app.listen(process.env.PORT, () =>
  console.log(`The server is listening on ${process.env.PORT}`)
);

//safety net : handling unhandled rejections (async type)
process.on("unhandledRejection", () => {
  //first shutdown the servers then exit
  server.close(() => {
    process.exit(1);
  });
});
module.exports = app;
