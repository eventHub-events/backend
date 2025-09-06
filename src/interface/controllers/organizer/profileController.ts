import { Request, Response } from "express";
import { IOrganizerProfileUseCase } from "../../../application/interface/organizer/IOrganizerProfileUseCase";
import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class OrganizerProfileController{
  constructor(private _organizerProfileUseCase:IOrganizerProfileUseCase){}
   async createProfile(req:Request,res:Response){
    try{
      
      const profileDto= new OrganizerProfileDTO(req.body)
      const profileData= await  this._organizerProfileUseCase.registerOrganizerProfile(profileDto)
        if(profileData){
         return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("profile data creation successful",HttpStatusCode.CREATED,profileData))
        }
        return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Failed to create Profile",HttpStatusCode.BAD_REQUEST))
    }catch(err:unknown){
      const error=HandleErrorUtility.handleError(err)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))

    }
    
    
    }

    async  updateOrganizerProfile(req:Request,res:Response){
      try{
         const {id}=req.params
             if(!id)return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Organizer id is required",HttpStatusCode.BAD_REQUEST))
              console.log("reeeee",req.body)
        const updateProfileDto= new OrganizerProfileDTO(req.body)
      console.log("uodared",updateProfileDto)
      if(!updateProfileDto) return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("update profile details are empty",HttpStatusCode.BAD_REQUEST))
        const updatedProfileData= await this._organizerProfileUseCase.updateOrganizerProfile(id,updateProfileDto)
      console.log("uodarednnnn",updatedProfileData)
         if(updatedProfileData){
         return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("profile data creation successful",HttpStatusCode.CREATED,updatedProfileData))
        }
        return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Failed to create Profile",HttpStatusCode.BAD_REQUEST))


      }catch(err:unknown){
        const error=HandleErrorUtility.handleError(err)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))


      }

    }


    async getOrganizerProfile(req:Request,res:Response){
         try{
            const {id}=req.params
             if(!id)return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Organizer id is required",HttpStatusCode.BAD_REQUEST))
             const profileData= await this._organizerProfileUseCase.organizerProfile(id)
            console.log("profile data is ",profileData)
             if(!profileData){
              return res.status(HttpStatusCode.NOT_FOUND).json(ApiResponse.error("Error in  fetching profile data",HttpStatusCode.NOT_FOUND))
            }
            return res.status(HttpStatusCode.OK).json(ApiResponse.success("Profiled Data fetched successfully",HttpStatusCode.OK,profileData))
             
         } catch(err:unknown){
              const error= HandleErrorUtility.handleError(err)
              return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
         }
       
   }
  }