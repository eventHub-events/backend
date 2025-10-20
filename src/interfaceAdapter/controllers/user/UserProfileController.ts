import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IUserProfileUseCase } from "../../../application/interface/useCases/user/IUserProfileUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IErrorMapper } from "../../../application/interface/common/errorMappers/IErrorMapper";



export class UserProfileController {
   
  constructor(
    private _userProfileUseCase : IUserProfileUseCase,
    private _errorMapper : IErrorMapper
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
         
         const updatedProfile= await this._userProfileUseCase.editProfileData(profileId , req.body);

         return res.status(HttpStatusCode.OK).json(ApiResponse.success("User Profile Updated successfully", HttpStatusCode.OK, updatedProfile ))

     }catch(err){
        
       next(this._errorMapper.toHttp(err as Error));
     }
  }

}


