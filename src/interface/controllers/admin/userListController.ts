import { Request, Response } from "express";
import {  IUserManagementUseCase } from "../../../application/interface/admin/IUserManagementUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { ISocketService } from "../../../application/interface/common/ISocketService";

export class UserListController{
  constructor( private _userManagementUseCase: IUserManagementUseCase){}

  async  fetchUsers(req:Request,res:Response){
    try{
       
      const users= await this._userManagementUseCase.fetchUsers()
    
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("fetched UserList successfully",HttpStatusCode.OK,users))

    }catch(err:unknown){
      const error= HandleErrorUtility.handleError(err)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
       
    }
  }
  async UpdateUser(req:Request,res:Response){
    try{
      const{id,data}=req.body
     
    
      const result= await this._userManagementUseCase.updateUser(id,data)
      console.log("data .is blocked",data.isBlocked)
      

      console.log("result in  admin",result)
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("User data updated successfully",HttpStatusCode.OK,result))
    }
    catch(err:unknown){
      const error= HandleErrorUtility.handleError(err)
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
  }


     
  }

