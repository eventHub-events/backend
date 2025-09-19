import { NextFunction, Request, Response } from "express";
import { IOrganizerProfileUseCase } from "../../../application/interface/organizer/IOrganizerProfileUseCase";
import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { CustomError } from "../../../infrastructure/errors/errorClass";

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

    async  updateOrganizerProfile(req:Request,res:Response , next :NextFunction): Promise <Response|void>{
      try{
         const {id}=req.params ;
         
        
             if(!id){

              
              throw new CustomError("Organizer ID is  required", HttpStatusCode.BAD_REQUEST)

             }
        const profileData = req .body;
    
      if(!profileData) {

             throw new CustomError("update profile details are empty",HttpStatusCode.BAD_REQUEST)
      } 
        const updatedProfileData = await this._organizerProfileUseCase.updateOrganizerProfile(id,profileData)
    
         if(!updatedProfileData){


        
          throw new CustomError("Failed to create Profile",HttpStatusCode.BAD_REQUEST)

        }
        return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("profile data creation successful",HttpStatusCode.CREATED,updatedProfileData))


      }catch(err:unknown){
     
      next (err)


      }

    }


    async fetchOrganizerProfile(req:Request,res:Response){
         try{
            const {id}=req.params
             if(!id)return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Organizer id is required",HttpStatusCode.BAD_REQUEST))
             const profileData= await this._organizerProfileUseCase.getOrganizerProfile(id)
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