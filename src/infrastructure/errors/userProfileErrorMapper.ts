// src/infrastructure/errors/ErrorMapperService.ts

import { CustomError } from "./errorClass";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";
import { IErrorMapper } from "../../application/interface/common/errorMappers/IErrorMapper";
import { DataFetchError, ForbiddenError, UpdateFailedError } from "../../domain/errors/userProfile";

export class ErrorMapperService implements IErrorMapper {
  toHttp(error: Error): CustomError {
    if (error instanceof ForbiddenError) {
      return new CustomError(error.message, HttpStatusCode.FORBIDDEN);
    }
    if(error instanceof UpdateFailedError) {
       return  new CustomError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
    if(error instanceof DataFetchError) {
       return  new CustomError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR)
    }


    return new CustomError(error.message ||"Unexpected error", HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
