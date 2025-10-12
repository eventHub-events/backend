import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IUserProfileUseCase } from "../../../application/interface/user/IUserProfileUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";



export class UserProfileController {
   
  constructor(
    private _userProfileUseCase : IUserProfileUseCase
  ){}
 async  fetchUserProfile(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<Response |void> {
   try{
        const {userId} = req.params;

      const userProfile = await this._userProfileUseCase.getUserProfile(userId);
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("User profile fetched successfully", HttpStatusCode.OK, userProfile))
      
   }catch(err){
    next(err)
   }
  }
 async  updateUserProfile(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void>{
     try{
         const {profileId} = req.params;
         console.log("hello   fro m up",profileId)

         const updatedProfile= await this._userProfileUseCase.editProfileData(profileId , req.body);

         return res.status(HttpStatusCode.OK).json(ApiResponse.success("User Profile Updated successfully", HttpStatusCode.OK, updatedProfile ))

     }catch(err){
       next(err)
     }
  }

}


