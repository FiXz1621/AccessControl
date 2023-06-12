import { Request, Response, NextFunction } from "express";

import { ParamsWithId } from "../interfaces/ParamsWithId";
import { Door, RawDoor } from "./doors.model";
import { formatDateToSQL, generateUUID } from "../../util";
import * as DoorService from "./doors.service";

export async function findAll(
  _req: Request<Record<string, never>, Door[], Record<string, never>>,
  res: Response<Door[]>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await DoorService.findAll();
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function findById(
  req: Request<ParamsWithId, Door, Record<string, never>>,
  res: Response<Door>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await DoorService.findById(
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
  req: Request<Record<string, never>, Door, RawDoor>,
  res: Response<Door>,
  next: NextFunction
) {
  const rawDoor = req.body;
  const newDoor: Door = {
    ...rawDoor,
    door_id: generateUUID(),
    last_opened: null,
  };
  const { statusCode, body, errorMessage } = await DoorService.create(newDoor);
  if (statusCode !== 201) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(201).json(body);
}

export async function update(
  req: Request<ParamsWithId, Door, Door>,
  res: Response<Door>,
  next: NextFunction
) {
  const door = req.body;
  const { statusCode, body, errorMessage } = await DoorService.update(
    req.params.id,
    door
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function remove(
  req: Request<ParamsWithId, Door, Record<string, never>>,
  res: Response<Door>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await DoorService.remove(
    req.params.id
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}
