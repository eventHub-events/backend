import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";


export interface IOrganizerProfileUseCase{
    registerOrganizerProfile(data:OrganizerProfileDTO):Promise<OrganizerProfileResponseDTO>
    updateOrganizerProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<OrganizerProfileResponseDTO>
    organizerProfile(id:string):Promise<OrganizerProfileResponseDTO|null>

}