import { Router } from "express";

import { validateRequest } from "../../middlewares";
import * as UserHandler from "./users.handler";
import { RawUser, UserForUpdate } from "./users.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";

const userRouter = Router();

userRouter.get("/", UserHandler.findAll);

userRouter.get(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  UserHandler.findById
);

userRouter.post(
  "/",
  validateRequest({
    body: RawUser,
  }),
  UserHandler.create
);

userRouter.put(
  "/:id",
  validateRequest({
    params: ParamsWithId,
    body: UserForUpdate,
  }),
  UserHandler.update
);

userRouter.delete(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  UserHandler.remove
);

export default userRouter;
