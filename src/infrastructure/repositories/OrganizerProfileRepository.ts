import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { OrganizerProfileMapper } from "../../application/mapper/organizer/OrganizerProfileMapper";
import { OrganizerProfileDTO } from "../../domain/dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUserMinimal } from "../../domain/types/IUserMinimal";
import OrganizerProfileModel, { IOrganizerProfile } from "../db/models/organizer/profile/OrganizerProfile";
import { BaseRepository } from "./BaseRepository";

export class  OrganizerProfileRepository extends BaseRepository<IOrganizerProfile> implements IOrganizerProfileRepository{
  constructor(private logger :ILoggerService){
    super(OrganizerProfileModel)
  }
  async createProfile(profileData: OrganizerProfileDTO): Promise<OrganizerProfileResponseDTO> {
      this.logger.info(`Creating Organizer profile for id:${profileData.organizerId}`)
      const profileDoc=await super.create(OrganizerProfileMapper.toDomain(profileData));
      return OrganizerProfileMapper.toResponse( profileDoc as IOrganizerProfile & { organizerId: IUserMinimal })
  }
 async findByOrganizerId(id: string): Promise<OrganizerProfileResponseDTO | null> {
      this.logger.info(`Finding the Organizer Profile with Id:${id}`)
      const profileDoc= await super.findOneWithPopulate({organizerId:id},["organizerId"]);
      console.log("heel",profileDoc);
      
      return profileDoc ? OrganizerProfileMapper.toResponse( profileDoc as IOrganizerProfile & { organizerId: IUserMinimal }):null
  }
  async updateProfile(id: string, data: Partial<OrganizerProfileDTO>): Promise<OrganizerProfileResponseDTO> {
      this.logger.info(`Updating Organizer Profile with id:${id}`)
      const updated=await super.findOneAndUpdate({organizerId:id},data)
      if(!updated){
        this.logger.error(`No profile found with organizerId:${id}`);
        throw new Error("Profile  not found");

      }
      return  OrganizerProfileMapper.toResponse(updated as IOrganizerProfile & {organizerId:IUserMinimal})

  }
}