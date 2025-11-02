import { JwtPayload } from "jsonwebtoken";

export interface IUserTokenPayload extends JwtPayload{
  id?:string,
  role?:string
}