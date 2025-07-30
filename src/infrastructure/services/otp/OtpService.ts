import redis from "../../../config/reddis/Redis";
import { ICacheService } from "../../interface/ICacheService";
import { IOtpService } from "../../interface/IOtpService";

export class OtpService implements IOtpService {
   constructor(private _cache:ICacheService){}
   async generateOtp(email: string, data: any): Promise<string> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await this._cache.set(`otp:${email}`, 120, JSON.stringify({ otp, data }));
      return otp;
    } catch (err) {
      console.error("Redis error:", err);
      throw new Error("Failed to store OTP. Try again.");
    }
  }

    
  

   async verifyOtp(email:string,otp:any):Promise<string>{
    try{
      
      const  stored=await this._cache.get(`otp:${email}`)
      if(!stored) throw new Error("OTP expired or not found")
        const {otp:savedOtp,data}=JSON.parse(stored)
      if(savedOtp!==otp){
        throw new Error("Invalid otp")
      }
      await this._cache.del(`otp:${email}`)
      return data
    }catch(err){
      console.log(err)
      throw new Error("OTP verification failed")
    }

  }
}
