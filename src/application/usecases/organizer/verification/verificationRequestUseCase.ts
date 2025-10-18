
import { RequestVerificationDTO } from "../../../../domain/DTOs/organizer/verification/requestVerificationDTO";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { CustomError } from "../../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../../infrastructure/interface/enums/HttpStatusCode";
import { IVerificationEmailTemplate } from "../../../../infrastructure/interface/IVerificationEmailtemplate";
import { IVerificationRequestUseCase } from "../../../interface/organizer/IVerificationRequestUseCase";
import { IEmailService } from "../../../interface/user/IEmailService";

export class VerificationRequestUseCase implements IVerificationRequestUseCase {

  constructor(
      private _userRepo: IUserRepository,
      private _emailService: IEmailService,
      private _verificationTemplate: IVerificationEmailTemplate
  ){}

   async requestVerification (organizerId: string, requestData : RequestVerificationDTO): Promise<string>  {

        const updatedUser =  await this._userRepo.updateUser(organizerId,{kycStatus: requestData.kycStatus}as Partial< User>);
        if(!updatedUser){
          throw new CustomError("request  for verification failed",HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const html = this._verificationTemplate.generateHtml(updatedUser.name,requestData.kycStatus)
         await this._emailService.sendMail(updatedUser.email, "Verification Request received",html)
        return "verification request  submitted successfully"

  }
}