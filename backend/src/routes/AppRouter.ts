import express from "express";

/**
 * Singleton class for router instance
 */
class AppRouter {
  private static instance: express.Router;
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}

module.exports = AppRouter;
