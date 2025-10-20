import { OrganizerProfileDTO } from "../../../../domain/DTOs/organizer/OrganizerProfileDTO";
import { UpdatedOrganizerProfileFormResponseDTO } from "../../../../domain/DTOs/organizer/OrganizerProfileFormDTO";
import { OrganizerProfileResponseDTO } from "../../../../domain/DTOs/organizer/OrganizerProfileResponseDTO";


export interface IOrganizerProfileUseCase{
    // registerOrganizerProfile(data:OrganizerProfileDTO):Promise<OrganizerProfileResponseDTO>
    updateOrganizerProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<UpdatedOrganizerProfileFormResponseDTO>
    getOrganizerProfile(id:string):Promise<OrganizerProfileResponseDTO|null>

}