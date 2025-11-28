import { OrganizerProfileDTO } from "../../../DTOs/organizer/OrganizerProfileDTO";
import { UpdatedOrganizerProfileFormResponseDTO } from "../../../DTOs/organizer/OrganizerProfileFormDTO";
import { OrganizerProfileResponseDTO } from "../../../DTOs/organizer/OrganizerProfileResponseDTO";


export interface IOrganizerProfileUseCase{
    // registerOrganizerProfile(data:OrganizerProfileDTO):Promise<OrganizerProfileResponseDTO>
    updateOrganizerProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<UpdatedOrganizerProfileFormResponseDTO>
    getOrganizerProfile(id:string):Promise<OrganizerProfileResponseDTO|null>

}