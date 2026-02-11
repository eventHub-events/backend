import { Resend } from "resend";
import { IEmailService } from "../../../application/interface/useCases/user/IEmailService";
import {  EmailServiceError } from "../../../domain/errors/common";
import { ErrorMessages } from "../../../constants/errorMessages";

export class ResendEmailService implements IEmailService {
  constructor(
     private _resend: Resend,
     private _fromEmail: string 
  ){}
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    try{
      console.log("hi  i  get  new Email")
     const response= await this._resend.emails.send({
       from: this._fromEmail,
       to,
       subject,
       html: body
      })
      console.log("RESEND RESPONSE:", response);
    }catch(err){
       if(err instanceof Error){
        throw new EmailServiceError(err.message)
       }else{ 
         throw new EmailServiceError(ErrorMessages.EMAIL.EMAIL_SERVICE_FAILED);
       }
    }
  }
}