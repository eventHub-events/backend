import { NextFunction, Request ,Response} from "express";
import { CustomError } from "../errors/errorClass";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";



export class ErrorHandlingMiddleware{

static handleError(err:Error|CustomError,req:Request,res:Response,next:NextFunction){
        if(err instanceof CustomError){
          return res.status(err.statusCode).json({
            success:false,
            statusCode:err.statusCode,
            message:err.message,
            errors:err.errors ||[]
          })
        }

        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          success:false,
          statusCode:HttpStatusCode.INTERNAL_SERVER_ERROR,
          message:"internalServer error",
          errors:[]
        })
}

}