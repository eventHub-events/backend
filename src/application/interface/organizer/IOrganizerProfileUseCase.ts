import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { UpdatedOrganizerProfileFormResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileFormDTO";
import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";


export interface IOrganizerProfileUseCase{
    registerOrganizerProfile(data:OrganizerProfileDTO):Promise<OrganizerProfileResponseDTO>
    updateOrganizerProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<UpdatedOrganizerProfileFormResponseDTO>
    getOrganizerProfile(id:string):Promise<OrganizerProfileResponseDTO|null>

}