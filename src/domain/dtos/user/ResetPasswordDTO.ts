export class ResetPasswordOtpDTO{
  readonly otp:string;

  
  constructor(data:{otp:string}){
    this.otp = data.otp?.trim();
  }
 
  }

  

