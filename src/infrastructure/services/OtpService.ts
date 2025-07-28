import redis from "../../config/reddis/Redis";

export class OtpService {
  static async generateOtp(email: string, data: any): Promise<string> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await redis.setex(`otp:${email}`, 120, JSON.stringify({ otp, data }));
      return otp;
    } catch (err) {
      console.error("Redis error:", err);
      throw new Error("Failed to store OTP. Try again.");
    }
  }


  
  static async verifyOtp(email:string,otp:any):Promise<string>{
    try{
      
      const  stored=await redis.get(`otp:${email}`)
      if(!stored) throw new Error("OTP expired or not found")
        const {otp:savedOtp,data}=JSON.parse(stored)
      if(!savedOtp===otp){
        throw new Error("Invalid otp")
      }
      await redis.del(`otp:{email}`)
      return data
    }catch(err){
      console.log(err)
      throw new Error("OTP verification failed")
    }

  }
}
