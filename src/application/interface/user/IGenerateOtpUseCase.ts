import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';

export interface IGenerateOtpUseCase {
  execute(email:string, data:UserRegisterDTO):Promise<string>
  reExecute(email:string):Promise<string>
}
