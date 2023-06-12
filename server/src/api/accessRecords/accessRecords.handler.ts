import { Request, Response, NextFunction } from "express";

import { ParamsWithId } from "../interfaces/ParamsWithId";
import { AccessRecord, RawAccessRecord } from "./accessRecords.model";
import { formatDateToSQL, generateUUID } from "../../util";
import * as AccessRecordService from "./accessRecords.service";

export async function findAll(
  _req: Request<Record<string, never>, AccessRecord[], Record<string, never>>,
  res: Response<AccessRecord[]>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } =
    await AccessRecordService.findAll();
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function findById(
  req: Request<ParamsWithId, AccessRecord, Record<string, never>>,
  res: Response<AccessRecord>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await AccessRecordService.findById(
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
  req: Request<Record<string, never>, AccessRecord, RawAccessRecord>,
  res: Response<AccessRecord>,
  next: NextFunction
) {
  const rawAccessRecord = req.body;
  const newAccessRecord: AccessRecord = {
    ...rawAccessRecord,
    access_record_id: generateUUID(),
    access_date: formatDateToSQL(new Date()),
  };
  const { statusCode, body, errorMessage } = await AccessRecordService.create(
    newAccessRecord
  );
  if (statusCode !== 201) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(201).json(body);
}

export async function update(
  req: Request<ParamsWithId, AccessRecord, AccessRecord>,
  res: Response<AccessRecord>,
  next: NextFunction
) {
  const accessRecord = req.body;
  const { statusCode, body, errorMessage } = await AccessRecordService.update(
    req.params.id,
    accessRecord
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function remove(
  req: Request<ParamsWithId, AccessRecord, Record<string, never>>,
  res: Response<AccessRecord>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await AccessRecordService.remove(
    req.params.id
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}
