import { NextFunction, Request, Response } from "express";
import { IOrganizerProfileUseCase } from "../../../application/interface/useCases/organizer/IOrganizerProfileUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { CustomError } from "../../../infrastructure/errors/errorClass";

export class OrganizerProfileController{
  constructor(private _organizerProfileUseCase: IOrganizerProfileUseCase){}
  
  

    async  updateOrganizerProfile(req:Request, res:Response , next :NextFunction): Promise <Response|void>{
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


        
          throw new CustomError("Failed to update Profile",HttpStatusCode.BAD_REQUEST)

        }
        return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("profile data creation successful",HttpStatusCode.CREATED,updatedProfileData))


      }catch(err:unknown){
     
      next (err)


      }

    }


    async fetchOrganizerProfile(req:Request,res:Response,next: NextFunction): Promise< Response | void >{
         try{
            const {id}=req.params ;

             if(!id){

                throw new CustomError("Organizer ID is  required", HttpStatusCode.BAD_REQUEST)

             }
             const profileData = await this._organizerProfileUseCase.getOrganizerProfile(id)

             if(!profileData){
               
              throw new CustomError("Error in  fetching profile data",HttpStatusCode.NOT_FOUND)

            }
            return res.status(HttpStatusCode.OK).json(ApiResponse.success("Profiled Data fetched successfully",HttpStatusCode.OK,profileData))
             
         } catch(err:unknown){

             next (err)
         }
       
   }
  }