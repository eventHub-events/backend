export interface IPasswordSetOtpTemplate {
  generate(params:{userName: string, otp :string,appName?:string,expiryMinutes?: number}):{subject :string, html :string};
}