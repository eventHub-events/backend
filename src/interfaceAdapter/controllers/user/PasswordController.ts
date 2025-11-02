import { NextFunction, Request, Response } from "express";
import { IForgetPasswordUseCase } from "../../../application/interface/useCases/user/IForgetPasswordUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IVerifyResetPasswordOtpUseCase } from "../../../application/interface/useCases/user/IResetPasswordOTPUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { IChangePasswordUseCase } from "../../../application/interface/useCases/user/IChangePasswordUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ChangePasswordDTO } from "../../../domain/DTOs/user/ChangePasswordDTO";


export class  PasswordController {
  constructor(

    private _forgetPasswordUseCase: IForgetPasswordUseCase,
    private _verifyResetPasswordUseCase: IVerifyResetPasswordOtpUseCase,
    private _changePasswordUseCase: IChangePasswordUseCase

  ){}
 
   requestForgetPassword = async (req: Request,res : Response ,next: NextFunction): Promise< Response | void > => {
    try{
      console.log("hello")
       const result = await this._forgetPasswordUseCase.forgetPassword(req.body);

       
       return res.status(HttpStatusCode.OK).json(ApiResponse.success("Password reset initiated", HttpStatusCode.OK, result))

    }catch(err){
      next(err)
    }

  }

 async verifyResetPasswordOtp(req: Request, res: Response, next: NextFunction): Promise< Response | void > {
     
        try{
             
                    //  const dto= new ResetPasswordOtpDTO(req.body)           
         const {user,token}= await this._verifyResetPasswordUseCase.resetPassword(req.body) ;
         
           if(user){
                         res.cookie("resetToken", token, {
                     httpOnly: true,
                     secure: process.env.NODE_ENV === "production",
                     sameSite: "strict",
                     maxAge: 5 * 60 * 1000,
                   });
                   
             
                       return res.status(HttpStatusCode.OK).json(ApiResponse.success("Otp verification  successful",HttpStatusCode.OK,user))
                     }
        }catch(err){
          next(err)
        }
        
       
 }
  async  changePassword(req:IAuthenticatedRequest,res:Response,next: NextFunction): Promise< Response|void >{
     try{
       const token= req.resetToken
       if (!token) {
 
           throw new CustomError("Reset token missing or expired",HttpStatusCode.UNAUTHORIZED);

        }
       const dto: ChangePasswordDTO = req.body;
       const result= await this._changePasswordUseCase.changePassword(dto, token)
       return res.status(HttpStatusCode.OK).json(ApiResponse.success("Password changed successfully",HttpStatusCode.OK,result))
 
     }catch(err){
          next(err)
     }
 
   }
              
}