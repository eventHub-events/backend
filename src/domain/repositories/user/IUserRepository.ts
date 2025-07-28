import { User } from "../../entities/User";

export interface IUserRepository{
  createUser(user:User):Promise<User>;
  findByEmail(email:string):Promise<User|null>;
  verifyUser(userId:string):Promise<void>
}