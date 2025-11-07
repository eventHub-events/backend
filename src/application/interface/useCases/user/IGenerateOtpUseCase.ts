import { UserRegisterDTO } from '../../../DTOs/user/RegisterUserDTO';

export interface IGenerateOtpUseCase {
  execute(email:string, data:UserRegisterDTO):Promise<string>
  reExecute(email:string):Promise<string>
  executeForForgetPassword(email:string,user:UserRegisterDTO):Promise<string>
}
