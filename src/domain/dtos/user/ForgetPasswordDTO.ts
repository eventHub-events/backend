export class ForgetPasswordDTO{
   email:string;
  constructor(data:{email:string}){
    const trimmed=data.email?.trim()
    if(!trimmed ||!this.validateEmail(trimmed)){
      throw new Error("Email is not valid")
    }
    this.email=trimmed

  }
  private validateEmail(email:string):boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}