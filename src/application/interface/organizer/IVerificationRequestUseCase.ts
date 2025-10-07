import { RequestVerificationDTO } from "../../../domain/dtos/organizer/verification/requestVerificationDTO";

export interface IVerificationRequestUseCase {
  requestVerification (organizerId: string, requestData : RequestVerificationDTO): Promise<string>;
}