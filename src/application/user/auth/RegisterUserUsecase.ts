import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { OtpService } from "../../../infrastructure/services/OtpService";

export class RegisterUserUsecase {

  constructor(private _userRepo: IUserRepository) {}


  async execute(data: UserRegisterDTO) {
    const existing = this._userRepo.findByEmail(data.email);
    if (!existing) throw new Error("User already  exists");
    const otp = await OtpService.generateOtp(data.email, data);
    console.log(` OTP for ${data.email}: ${otp}`);
    return { message: "OTP sent successfully" };
  }
  


}
