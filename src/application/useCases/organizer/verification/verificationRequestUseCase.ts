import { RequestVerificationDTO } from '../../../DTOs/organizer/verification/RequestVerificationDTO';
import { UserEntity } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../../infrastructure/interface/enums/HttpStatusCode';
import { IVerificationEmailTemplate } from '../../../../infrastructure/interface/IVerificationEmailtemplate';
import { IVerificationRequestUseCase } from '../../../interface/useCases/organizer/IVerificationRequestUseCase';
import { IEmailService } from '../../../interface/useCases/user/IEmailService';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';

export class VerificationRequestUseCase implements IVerificationRequestUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _emailService: IEmailService,
    private _verificationTemplate: IVerificationEmailTemplate
  ) {}

  async requestVerification(
    organizerId: string,
    requestData: RequestVerificationDTO
  ): Promise<string> {
    const updatedUser = await this._userRepo.updateUser(organizerId, {
      kycStatus: requestData.kycStatus,
      isKycSubmitted: true
    } as Partial<UserEntity>);
    if (!updatedUser) {
      throw new CustomError(
        ErrorMessages.ORGANIZER.REQUEST_FOR_VERIFICATION_FAILED,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
    const html = this._verificationTemplate.generateHtml(
      updatedUser.name,
      requestData.kycStatus
    );
    await this._emailService.sendMail(
      updatedUser.email,
      
      ResponseMessages.ORGANIZER_VERIFICATION.REQUEST_RECEIVED,
      html
    );
    return ResponseMessages.ORGANIZER_VERIFICATION.ORGANIZER_VERIFICATION_REQUEST_SUCCESS;
  }
}
