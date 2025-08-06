import { IUserLoginResponse } from "../../../domain/types/IUserLoginResponse";

export interface  ILoginUserUseCase{
  loginUser(email:string, password:string):Promise<IUserLoginResponse>
}