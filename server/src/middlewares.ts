import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import jwt, { JwtPayload } from "jsonwebtoken";

import RequestValidators from './api/interfaces/RequestValidators';
import { AuthenticatedRequest } from './api/interfaces/AuthenticatedRequest';

// HTTPs redirect middleware, if the request is not HTTPs it redirects to the same URL but with HTTPs
export const httpsRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (req.protocol === 'http') {
    res.redirect(`https://${req.hostname}${req.originalUrl}`);
  } else {
    next();
  }
};

// Not found middleware, if the request does not match any route it throws a 404 error
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handler middleware, if the request status code is not 200 it responds with the error message and stack trace (only in development)
export const errorHandler = (error: Error, _req: Request, res: Response) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

// Request validation middleware, if the request does not match the schema it throws a 422 error
export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
}

// JWT verification middleware, if the token is not valid it throws a 401 error
export function verifyToken(
  req: AuthenticatedRequest,
  res: Response, 
  next: NextFunction
  ) {
  const secret = process.env.JWT_SECRET
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const {user_id, role_id} = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      user_id,
      role_id
    };

    next();
  } catch (error) {
    next(error);
  }
}