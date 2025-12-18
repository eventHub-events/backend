import { RequestVerificationDTO } from '../../../DTOs/organizer/verification/RequestVerificationDTO';

export interface IVerificationRequestUseCase {
  requestVerification(
    organizerId: string,
    requestData: RequestVerificationDTO
  ): Promise<string>;
}
