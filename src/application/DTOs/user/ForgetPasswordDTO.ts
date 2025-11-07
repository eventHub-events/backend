import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";

export class ForgetPasswordDTO{
   public readonly email:string;
  constructor(data:{email:string}){
    const trimmed=data.email?.trim()
    if(!trimmed) throw new CustomError("Email is required",HttpStatusCode.BAD_REQUEST)
    if(!this.validateEmail(trimmed)){
      throw new CustomError("Invalid Email  format",HttpStatusCode.BAD_REQUEST)
    }
    this.email=trimmed

  }
  private validateEmail(email:string):boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}