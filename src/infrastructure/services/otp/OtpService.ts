
import { ICacheService } from '../../interface/ICacheService';
import { IOtpService } from '../../interface/IOtpService';

export class OtpService implements IOtpService {
  constructor(private _cache: ICacheService) {}

  async generateOtp(email: string, data: any): Promise<string> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

       await this._cache.set(
        `otp:${email}`,
        600,
        JSON.stringify({ otp, data }),
      );
      

      return otp;
    } catch (err) {
      throw new Error('Failed to store OTP. Try again.');
    }
  }

  async reGenerateOtp(email: string): Promise<string> {
    console.log('regenerate otp');
    console.log('email in  regenerate otp', email);
    const data = await this._cache.get(`otp:${email}`);

    if (!data) throw new Error('User not found or OTP expired');
    const parsed = JSON.parse(data);
    console.log('data in regenerate otp', data);

    return parsed.data;
  }

  async verifyOtp(email: string, otp: any): Promise<string> {
    try {
      console.log('verify otp  service otp', email, otp);
      const stored = await this._cache.get(`otp:${email}`);
      console.log('storedData is ', stored);

      if (!stored) throw new Error('OTP expired or not found');
      const { otp: savedOtp, data } = JSON.parse(stored);
      if (savedOtp !== otp) {
        throw new Error('Invalid otp');
      }
      await this._cache.del(`otp:${email}`);
      return data;
    } catch (err) {
      throw new Error('OTP verification failed');
    }
  }
}
