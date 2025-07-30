import { UserRegisterDTO } from "../../dtos/user/RegisterUserDTO";
import { User } from "../../entities/User";

export interface IUserRepository{
  createUser(user:UserRegisterDTO):Promise<User>;
  findByEmail(email:string):Promise<User|null>;
  verifyUser(userId:string):Promise<void>
}