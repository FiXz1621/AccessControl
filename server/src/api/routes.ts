import { Router } from "express";

import clientAuthorization from "./authorization/clientAuthorization.routes";
import userRouter from "./users/users.routes";
import doorsRouter from "./doors/doors.routes";
import rolesRouter from "./roles/roles.routes";
import accessRecordsRouter from "./accessRecords/accessRecords.routes";
import { verifyToken } from "../middlewares";

export const apiRouter = Router();

apiRouter.use("/authorize", clientAuthorization);
apiRouter.use("/users", verifyToken, userRouter);
apiRouter.use("/doors", verifyToken, doorsRouter);
apiRouter.use("/roles", verifyToken, rolesRouter);
apiRouter.use("/accessRecords", verifyToken, accessRecordsRouter);
