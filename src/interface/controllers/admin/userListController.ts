import { Request, Response } from "express";
import { IFetchUserUseCase } from "../../../application/interface/admin/IFetchUsersUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class UserListController{
  constructor( private _fetchUserUseCase: IFetchUserUseCase ){}

  async  fetchUsers(req:Request,res:Response){
    try{
       console.log("hello from  user list controller")
       const page=parseInt(req.query.page as string) || 1;
       const limit= parseInt(req.query.limit as string) ||5;
       console.log("pp",page,limit)
      const result= await this._fetchUserUseCase.fetchUsers({page,limit})
      if(!result)  return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("Users not found",HttpStatusCode.BAD_REQUEST))
        const{users,total}=result
      console.log("users in as",users)
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("fetched UserList successfully",HttpStatusCode.OK,{users,total}))

    }catch(err:unknown){
      const error= HandleErrorUtility.handleError(err)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
       
    }
  }
  async UpdateUser(req:Request,res:Response){
    try{
      const{id,data}=req.body
      console.log("id,data",id,data)
    
      const result= await this._fetchUserUseCase.updateUser(id,data)
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("User data updated successfully",HttpStatusCode.OK,result))
    }
    catch(err:unknown){
      const error= HandleErrorUtility.handleError(err)
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(error,HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
  }


     
  }

