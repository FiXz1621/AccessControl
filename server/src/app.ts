import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { v4 as uuid } from "uuid";

import * as middlewares from "./middlewares";
import { generateHashedPassword } from "./util";
import { apiRouter } from "./api/routes";

export default function createApp(): express.Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use("/favicon.ico", express.static("images/favicon.ico"));

  // Disable https redirect for development purposes
  // app.use(middlewares.httpsRedirect);

  app.use("/api/v1", apiRouter);

  app.use(middlewares.notFound);

  app.use(middlewares.errorHandler);

  return app;
}
