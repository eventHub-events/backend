import { Error } from "mongoose";


export class CustomError extends Error{
  public readonly statusCode:number;
  public readonly errors?:string|string[]
  constructor(message:string,statuscode:number,errors:string|string[]){
    super(message);
    this.statusCode=statuscode;
    this.errors=errors

  }

}