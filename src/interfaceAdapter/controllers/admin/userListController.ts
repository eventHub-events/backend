import { NextFunction, Request, Response } from "express";
import { IFetchUserUseCase } from "../../../application/interface/useCases/admin/IFetchUsersUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { CustomError } from "../../../infrastructure/errors/errorClass";

export class UserListController{
  constructor( private _fetchUserUseCase: IFetchUserUseCase ){}

  async  fetchUsers(req:Request,res:Response, next: NextFunction): Promise<void> {
    try{
      
    
               const page=parseInt(req.query.page as string) || 1;
               const limit= parseInt(req.query.limit as string) ||5;
               const { search, status, role } = req.query;

               const result= await this._fetchUserUseCase.fetchUsers({page, limit, search:search as string, role:role as string, status: status as string});
     
               if(!result) throw new CustomError("Users  not found", HttpStatusCode.NOT_FOUND)

            const{usersList, total} = result;
     
      res.status(HttpStatusCode.OK).json(ApiResponse.success("fetched UserList successfully",HttpStatusCode.OK,{usersList,total}))

    }catch(err){
        next(err)
    }
  }
  async UpdateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    try{

            const{ id, data } = req.body;
           const result= await this._fetchUserUseCase.updateUser(id,data);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("User data updated successfully",HttpStatusCode.OK,result));

    }
    catch(err:unknown){
        next(err)
    }
  }


     
  }