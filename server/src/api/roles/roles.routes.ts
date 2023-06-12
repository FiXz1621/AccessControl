import { Router } from "express";

import { validateRequest } from "../../middlewares";
import * as roleHandler from "./roles.handler";
import { Role, rawRole as RawRole } from "./roles.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";

const rolesRouter = Router();

rolesRouter.get("/", roleHandler.findAll);

rolesRouter.get(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  roleHandler.findById
);

rolesRouter.post(
  "/",
  validateRequest({
    body: RawRole,
  }),
  roleHandler.create
);

rolesRouter.put(
  "/:id",
  validateRequest({
    params: ParamsWithId,
    body: Role,
  }),
  roleHandler.update
);

rolesRouter.delete(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  roleHandler.remove
);

export default rolesRouter;
