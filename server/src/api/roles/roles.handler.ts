import { Request, Response, NextFunction } from "express";

import sql from "../../db";
import { RawRole, Role } from "./roles.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";
import { generateUUID } from "../../util";
import * as RoleService from "./roles.service";

export async function findAll(
  _req: Request<Record<string, never>, Role[], Record<string, never>>,
  res: Response<Role[]>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await RoleService.findAll();
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function findById(
  req: Request<ParamsWithId, Role, Record<string, never>>,
  res: Response<Role>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await RoleService.findById(
    req.params.id
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function create(
  req: Request<Record<string, never>, Role, RawRole>,
  res: Response<Role>,
  next: NextFunction
) {
  const rawRole = req.body;
  const newRole: Role = {
    ...rawRole,
    role_id: generateUUID(),
  };
  const { statusCode, body, errorMessage } = await RoleService.create(newRole);
  if (statusCode !== 201) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(201).json(body);
}

export async function update(
  req: Request<ParamsWithId, Role, Role>,
  res: Response<Role>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await RoleService.update(
    req.params.id,
    req.body
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function remove(
  req: Request<ParamsWithId, Role, Record<string, never>>,
  res: Response<Role>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await RoleService.remove(
    req.params.id
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}
