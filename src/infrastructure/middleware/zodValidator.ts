import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodObject,ZodError } from "zod";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";
import { ApiResponse } from "../commonResponseModel/ApiResponse";



export class ZodPasswordValidator{
static validate(schema:ZodObject): RequestHandler {
  return (req:Request ,res :Response, next:NextFunction) => {
    const result=schema.safeParse(req.body);
    

    if(!result.success) {
         const errorMessage = result.error.issues[0]?.message   || "Validation failed" ;
     return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error(errorMessage,HttpStatusCode.BAD_REQUEST))

  }
  req.body = result.data;
  next() ;

}
}
}