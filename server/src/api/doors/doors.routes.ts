import { Router } from "express";

import { validateRequest } from "../../middlewares";
import * as doorHandler from "./doors.handler";
import { Door, rawDoor as RawDoor } from "./doors.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";

const doorsRouter = Router();

doorsRouter.get("/", doorHandler.findAll);

doorsRouter.get(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  doorHandler.findById
);


doorsRouter.post(
  "/",
  validateRequest({
    body: RawDoor,
  }),
  doorHandler.create
);

doorsRouter.put(
  "/:id",
  validateRequest({
    params: ParamsWithId,
    body: Door,
  }),
  doorHandler.update
);

doorsRouter.delete(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  doorHandler.remove
);

export default doorsRouter;
