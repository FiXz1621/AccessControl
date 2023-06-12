import { Request, Response, NextFunction } from "express";

import { RawUser, User, UserForDBUpdate, UserForUpdate } from "./users.model";
import { ParamsWithId } from "../interfaces/ParamsWithId";
import {
  formatDateToSQL,
  generateHashedPassword,
  generateUUID,
  generateUniquePin,
} from "../../util";

import * as UserService from "./users.service";

export async function findAll(
  _req: Request<Record<string, never>, User[], Record<string, never>>,
  res: Response<User[]>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await UserService.findAll();
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function findById(
  req: Request<ParamsWithId, User, Record<string, never>>,
  res: Response<User>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await UserService.findById(
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
  req: Request<Record<string, never>, User, RawUser>,
  res: Response<User>,
  next: NextFunction
) {
  const rawUser = req.body;
  const { raw_password, ...rest } = rawUser;
  const newUser: User = {
    ...rest,
    user_id: generateUUID(),
    register_date: formatDateToSQL(new Date()),
    hashed_password: await generateHashedPassword(rawUser.raw_password),
    pin_code: await generateUniquePin(),
  };
  newUser.expiration_date = newUser.expiration_date
    ? formatDateToSQL(new Date(newUser.expiration_date))
    : null;

  
  const { statusCode, body, errorMessage } = await UserService.create(newUser);
  if (statusCode !== 201) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(201).json(body);
}

export async function update(
  req: Request<ParamsWithId, User, UserForUpdate>,
  res: Response<User>,
  next: NextFunction
) {
  let { password, change_expiration, expiration_date, ...rest} = req.body;

  const user: UserForDBUpdate = {
    ...rest,
  };

  if (change_expiration) {
    user.expiration_date = expiration_date
    ? formatDateToSQL(new Date(expiration_date))
    : null;  
  }
  
  if (password) {
    user.hashed_password = await generateHashedPassword(password);
  } 

  const { statusCode, body, errorMessage } = await UserService.update(
    req.params.id,
    user  
  );

  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}

export async function remove(
  req: Request<ParamsWithId, User, Record<string, never>>,
  res: Response<User>,
  next: NextFunction
) {
  const { statusCode, body, errorMessage } = await UserService.remove(
    req.params.id
  );
  if (statusCode !== 200) {
    res.status(statusCode);
    next(new Error(errorMessage));
    return;
  }
  res.status(200).json(body);
}
