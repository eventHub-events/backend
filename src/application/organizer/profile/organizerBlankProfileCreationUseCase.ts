import { BlankOrganizerProfileDTO } from "../../../domain/dtos/organizer/BlackOrganizerProfileDTO";
import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfileRepository } from "../../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IOrganizerBlankProfileCreationUseCase } from "../../interface/organizer/IOrganizerBlankProfileCreationUseCase";






export class OrganizerBlankProfileCreationUseCase implements IOrganizerBlankProfileCreationUseCase {

  constructor(
    private _profileRepo : IOrganizerProfileRepository
   
  ){}

  async createBlankProfile(organizerId: string):  Promise<OrganizerProfileResponseDTO> {

   const blankProfile: BlankOrganizerProfileDTO = {
  organizerId,
  organization: '',
  website: '',
  bio: '',
  location: '',
  profilePicture: '',
  trustScore: 0,
  totalEarnings: 0,
  kycVerified: false
};
     const result = await  this._profileRepo.createProfile(blankProfile as OrganizerProfileDTO)
     return result
       
   }

}