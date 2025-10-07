import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodObject } from "zod";

/**
 *  Reusable middleware to  validate the request body using zod.
 *  Throws zodError if validation fails and will ba caught by  centralized error handling middleware.
 */
export class  InputDataValidator {
  static validate(schema: ZodObject): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
     req.body = schema.parse(req.body);
     next()
    }
  }
}