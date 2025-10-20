import { Error } from "mongoose";


export class CustomError extends Error{
  public readonly statusCode:number;
  public readonly errors?:string|string[]
  constructor(message:string,statuscode:number,errors?:string|string[]){
    super(message);
    Object.defineProperty(this, 'name', {
      value: 'CustomError',
      writable: true,
      configurable: true,
      enumerable: false
    });
    this.statusCode=statuscode;
    this.errors=errors;
      Object.setPrototypeOf(this, new.target.prototype);

  }

}