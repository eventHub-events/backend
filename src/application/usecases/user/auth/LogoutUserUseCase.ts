import { ILogoutUseCase } from "../../../interface/useCases/user/ILogoutUseCase";


export class LogoutUserUseCase implements ILogoutUseCase{

  async execute():Promise<string>{
    return "logout successful"
  }

}