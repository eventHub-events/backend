import { NextFunction, Request ,Response} from "express";
import { CustomError } from "../errors/errorClass";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";
import { ZodError } from "zod";



export class ErrorHandlingMiddleware{

static handleError(err:Error|CustomError |ZodError,req:Request,res:Response, next:NextFunction){
        if(err instanceof CustomError){
          console.log("error is",err)
          return res.status(err.statusCode).json({
            success:false,
            statusCode:err.statusCode,
            message:err.message,
            errors:err.errors ||[]
          })
        }
        if (err instanceof ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: "Validation Error",
      errors: err.issues.map((e) => `${e.path.join(".")} - ${e.message}`),
    });
  }
           console.log("eerrrrrrrrr")
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          success:false,
          statusCode:HttpStatusCode.INTERNAL_SERVER_ERROR,
          message:"internalServer error",
          errors:[]
        })
}

}