import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv"
import { IGoogleAuthService } from "../../../application/service/common/IGoogleAuthService";
dotenv.config()

export class GoogleAuthService implements IGoogleAuthService {
    private _client :OAuth2Client;

    constructor(){
       this._client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
  
    async verifyGoogleToken(idToken: string, role: string) {
       const ticket = await this._client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
         });
         
         console.log("gggg",role)
      const payload = ticket.getPayload();
      if(!payload) throw new Error("Invalid Google token");

       if(!payload.name|| !payload.email ) throw new Error(" name and email is required");
      return {
         googleId: payload.sub,
         email: payload.email,
         name: payload.name,
         role: role,
         picture: payload.picture
       }
    
    }
}