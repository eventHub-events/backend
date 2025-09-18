import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";

export interface IOrganizerBlankProfileCreationUseCase{
  createBlankProfile(organizerId:string): Promise<OrganizerProfileResponseDTO>;

}