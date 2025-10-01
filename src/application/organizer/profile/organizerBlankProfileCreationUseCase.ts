import { BlankOrganizerProfileDTO } from "../../../domain/dtos/organizer/BlackOrganizerProfileDTO";
// import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
// import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";

import { IOrganizerProfileRepository } from "../../../domain/repositories/organizer/IOrganizerProfileRepository";
// import { IUserMinimal } from "../../../domain/types/IUserMinimal";
// import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IOrganizerBlankProfileCreationUseCase } from "../../interface/organizer/IOrganizerBlankProfileCreationUseCase";
import { OrganizerProfileMapper } from "../../mapper/organizer/OrganizerProfileMapper";






export class OrganizerBlankProfileCreationUseCase implements IOrganizerBlankProfileCreationUseCase {

  constructor(
    private _profileRepo : IOrganizerProfileRepository
   
  ){}

  async createBlankProfile(organizerId: string):  Promise<string> {

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
    const  organizerEntityData = OrganizerProfileMapper.toDomain( blankProfile)
     const result = await  this._profileRepo.createProfile( organizerEntityData)
    //  return  OrganizerProfileMapper.toResponse(result)
    // //  const final = OrganizerProfileMapper.toResponse( result as IOrganizerProfile & { organizerId: IUserMinimal })
    //  console.log("ffffffff",  final)
    //  return final
    // //  return result
    if(!result){
       throw new CustomError("Organizer profile creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    return "Profile created Successfully"
       
   }

}