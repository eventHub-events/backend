
import { ICacheService } from '../../interface/ICacheService';
import { IOtpService } from '../../interface/IOtpService';
import crypto from "crypto"

import { IHashService } from '../../../application/interface/useCases/user/IHashService';
import { UserRegisterDTO } from '../../../domain/DTOs/user/RegisterUserDTO';


export class OtpService implements IOtpService {
  constructor(private _cache: ICacheService, private _hashService:IHashService) {}

  async generateOtp(email: string, data: UserRegisterDTO): Promise<string> {
    try {
      const otp =  crypto.randomInt(100000, 999999).toString()
    
      const hashedOtp= await this._hashService.hash(otp)
    

       await this._cache.set(
        `otp:${email}`,
        600,
        JSON.stringify({ otp:hashedOtp, data }),
      );
      

      return otp;
    } catch (err) {
      throw new Error('Failed to store OTP. Try again.');
    }
  }

  async reGenerateOtp(email: string): Promise<string> {
  
    const data = await this._cache.get(`otp:${email}`);

    if (!data) throw new Error('User not found or OTP expired');
    const parsed = JSON.parse(data);
 const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await this._hashService.hash(otp);
  await this._cache.set(
    `otp:${email}`,
    600,
    JSON.stringify({ otp: hashedOtp,data: parsed.data })
  );

  return otp;

   
  }

  async verifyOtp(email: string, otp: string): Promise<UserRegisterDTO> {
    try {
   
      const stored = await this._cache.get(`otp:${email}`);
    

      if (!stored) throw new Error('OTP expired or not found');
      const { otp: savedOtp, data } = JSON.parse(stored);
      const result=await this._hashService.compare(otp,savedOtp);
      

      if (!result) {
        throw new Error('Invalid otp');
      }
      
      await this._cache.del(`otp:${email}`);
      return data;
    } catch (err) {
      throw new Error('OTP verification failed');
    }
  }
}
