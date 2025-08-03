export interface  ILoginUserUseCase{
  loginUser(email:string, password:string):Promise<{token:string,refreshToken:string}>
}