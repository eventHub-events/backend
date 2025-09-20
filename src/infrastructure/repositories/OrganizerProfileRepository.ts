import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { OrganizerProfileMapper } from "../../application/mapper/organizer/OrganizerProfileMapper";
import { BlankOrganizerProfileDTO } from "../../domain/dtos/organizer/BlackOrganizerProfileDTO";
import { OrganizerProfileDTO } from "../../domain/dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizer } from "../../domain/entities/IOrganizer";

import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUserMinimal } from "../../domain/types/IUserMinimal";
import OrganizerProfileModel, { IOrganizerProfile } from "../db/models/organizer/profile/OrganizerProfile";
import { IUserDocument } from "../db/models/UserModel";
import { CustomError } from "../errors/errorClass";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";
import { BaseRepository } from "./BaseRepository";

export class  OrganizerProfileRepository extends BaseRepository<IOrganizerProfile> implements IOrganizerProfileRepository{
  constructor(private logger :ILoggerService){
    super(OrganizerProfileModel)
  }
  async createProfile(profileData: OrganizerProfileDTO | BlankOrganizerProfileDTO): Promise < IOrganizerProfile > {
    // (profileData: OrganizerProfileDTO | BlankOrganizerProfileDTO): Promise<OrganizerProfileResponseDTO>

       this.logger.info(`Creating Organizer profile for id:${profileData.organizerId }`)

      const profileDoc=await super.create(OrganizerProfileMapper.toDomain(profileData));
      console.log("newwww profileDoc",profileDoc)
      return profileDoc

      // return OrganizerProfileMapper.toResponse( profileDoc as IOrganizerProfile & { organizerId: IUserMinimal })
  }
 async findByOrganizerId(id: string): Promise<(IOrganizerProfile & {organizerId :IUserDocument})| null> {
      this.logger.info(`Finding the Organizer Profile with Id:${id}`)
      const profileDoc= await super.findOneWithPopulate({organizerId:id},["organizerId"]);
      if(!profileDoc){

        throw new CustomError("Profile not found", HttpStatusCode.NOT_FOUND);
      }
      return profileDoc as(IOrganizerProfile & {organizerId :IUserDocument}) | null ;
     
  }
  async updateProfile(id: string, data: Partial<OrganizerProfileDTO>): Promise<IOrganizerProfile> {
      this.logger.info(`Updating Organizer Profile with id:${id}`)
      const updated=await super.findOneAndUpdate({organizerId:id},data)
      console.log("updated is",   updated)
      if(!updated){
        this.logger.error(`No profile found with organizerId:${id}`);
        throw new CustomError("Profile not found", HttpStatusCode.NOT_FOUND);

      }
    
       return updated

  }
}