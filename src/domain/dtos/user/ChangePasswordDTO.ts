

export class  ChangePasswordDTO{
  // readonly  email:string;
  readonly  password :string;
  constructor(data:{email:string,password:string}){
       this.validatePassword(data.password)
        // this.email=data.email;
        this.password=data.password
      }

private validatePassword(password:string){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
    if (!password || !passwordRegex.test(password)) {
      throw new Error('Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character');
    }
    return true
  }
}