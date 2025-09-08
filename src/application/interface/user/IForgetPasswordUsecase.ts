import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO"
export interface IForgetPasswordUseCase{
  forgetPassword(dto:ForgetPasswordDTO):Promise<{message:string}>

}