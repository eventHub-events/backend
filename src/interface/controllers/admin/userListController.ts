import { Request, Response } from "express";
import { IFetchUserUseCase } from "../../../application/interface/admin/IFetchUsersUseCase";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { IUsersDocument } from "../../../infrastructure/interface/IUsersDocument";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class UserListController{
  constructor( private fetchUserUseCase: IFetchUserUseCase ){}

  async  fetchUsers(req:Request,res:Response){
    try{

      const users= await this.fetchUserUseCase.fetchUsers()
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("fetched UserList successfully",HttpStatusCode.OK,users))

    }catch(err:unknown){
      const error= HandleErrorUtility.handleError(err)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
       
    }
  }


     
  }

