import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/errorClass';
import { HttpStatusCode } from '../interface/enums/HttpStatusCode';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { BadRequestError, CreationFailedError, NotFoundError } from '../../domain/errors/common';
import { ForbiddenError } from '../../domain/errors/userProfile';

export class ErrorHandlingMiddleware {
  static handleError(
    err: Error | CustomError | ZodError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {

    console.log("TYPE:", err.constructor.name);
console.log("INSTANCEOF CustomError:", err instanceof CustomError);
console.log("FULL ERROR:", err);

    if (err instanceof CustomError) {
      console.log('error is', err);
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        errCode: err.errCode,
        role: err.role,
        message: err.message,
        errors: err.errors || [],
      });
    }

       /* ---------------- Domain Errors ---------------- */
    if (err instanceof NotFoundError) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        message: err.message,
        errors: [],
      });
    }

     if (err instanceof BadRequestError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: err.message,
        errors: [],
      });
    }
     if (err instanceof CreationFailedError) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: err.message,
        errors: [],
      });
    }

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    if (err instanceof ForbiddenError) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED',
      });
    }
   if (err instanceof jwt.JsonWebTokenError) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: "Invalid token",
        code: "INVALID_TOKEN",
      });
    }

    if (err instanceof ZodError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: 'Validation Error',
        errors: err.issues.map(e => `${e.path.join('.')} - ${e.message}`),
      });
    }
    console.log('eerrrrrrrrr');
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'internalServer error',
      errors: [],
    });
  }
}
