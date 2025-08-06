export interface IUserLoginResponse{
  token:string;
  refreshToken:string;
  user:{
    id:string,
    name:string,
    email:string,
    role:string
  }

}