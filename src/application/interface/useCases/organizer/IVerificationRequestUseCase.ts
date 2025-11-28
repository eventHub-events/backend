import { RequestVerificationDTO } from "../../../DTOs/organizer/verification/requestVerificationDTO";

export interface IVerificationRequestUseCase {
  requestVerification (organizerId: string, requestData : RequestVerificationDTO): Promise<string>;
}