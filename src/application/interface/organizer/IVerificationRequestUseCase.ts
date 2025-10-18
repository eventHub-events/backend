import { RequestVerificationDTO } from "../../../domain/DTOs/organizer/verification/requestVerificationDTO";

export interface IVerificationRequestUseCase {
  requestVerification (organizerId: string, requestData : RequestVerificationDTO): Promise<string>;
}