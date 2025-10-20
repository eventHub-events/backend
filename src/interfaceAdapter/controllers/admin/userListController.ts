import { Request, Response } from "express";
import { IFetchUserUseCase } from "../../../application/interface/useCases/admin/IFetchUsersUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class UserListController{
  constructor( private _fetchUserUseCase: IFetchUserUseCase ){}

  async  fetchUsers(req:Request,res:Response){
    try{
       console.log("hello from  user list controller")
       console.log("request  query isn",req.query)
       const page=parseInt(req.query.page as string) || 1;
        const limit= parseInt(req.query.limit as string) ||5;
      
     

      const { search, status, role } = req.query;

       console.log("search",search)
       console.log("status",status)
       console.log("role",role)
       console.log("pp",page,limit)

      const result= await this._fetchUserUseCase.fetchUsers({page,limit,search:search as string,role:role as string,status:status as string})
      console.log("is it  empty  array",result)
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