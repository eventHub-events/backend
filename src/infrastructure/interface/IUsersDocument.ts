import { Types } from "mongoose";

export interface IUsersDocument  {

  _id:Types.ObjectId |unknown,
  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isBlocked:boolean;
  role: string;
  createdAt?:Date
}