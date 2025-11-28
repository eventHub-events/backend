

// export class  ChangePasswordDTO{
//   // readonly  email:string;
//   public  password :string;
//   constructor(data:{password:string,confirmPassword: string}){
//     console.log("data in dto",data)
//        const { password, confirmPassword } = data;

//     if (password !== confirmPassword) {
//       throw new Error("Passwords do not match");
//     }

//     this.validatePassword(password);
//     this.password = password;
//   }

// private validatePassword(password:string){
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
//     if (!password || !passwordRegex.test(password)) {
//       throw new Error('Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character');
//     }
//     return true
//   }
// }

export interface ChangePasswordDTO {
    password:string;
    confirmPassword:string;
}