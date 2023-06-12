import { Router } from "express";

import { validateRequest } from "../../middlewares";
import * as accessRecordHandler from "./accessRecords.handler";
import {
  AccessRecord,
  rawAccessRecord,
} from "./accessRecords.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";

const accessRecordsRouter = Router();

accessRecordsRouter.get("/", accessRecordHandler.findAll);

accessRecordsRouter.get(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  accessRecordHandler.findById
);

accessRecordsRouter.post(
  "/",
  validateRequest({
    body: rawAccessRecord,
  }),
  accessRecordHandler.create
);

accessRecordsRouter.put(
  "/:id",
  validateRequest({
    params: ParamsWithId,
    body: AccessRecord,
  }),
  accessRecordHandler.update
);

accessRecordsRouter.delete(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  accessRecordHandler.remove
);

export default accessRecordsRouter;
