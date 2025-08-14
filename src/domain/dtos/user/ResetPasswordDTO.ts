export class ResetPasswordDTO{
  readonly otp:string;
  readonly password:string;
  constructor(data: { otp: string; password: string }) {
    const trimmedPassword = data.password?.trim();

    if (!this.validatePassword(trimmedPassword)) {
      throw new Error('Invalid password format');
    }

    this.password = trimmedPassword;

    
    this.otp = data.otp?.trim();
  }


  private validatePassword(password:string){
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
    if (!password || !passwordRegex.test(password)) {
      throw new Error('Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character');
    }
    return true
  }

}