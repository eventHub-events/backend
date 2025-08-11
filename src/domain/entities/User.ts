
import { Types } from "mongoose";
export interface User {
  _id?:string;
  name:string;
  email:string;
  password:string;
  phone:number;
  isVerified:boolean
  role:string,
  isBlocked:boolean,
  createdAt?:Date
}
