import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv"
dotenv.config()

export class GoogleAuthService {
    private _client :OAuth2Client;

    constructor(){
       this._client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
  
    async verifyGoogleToken(idToken: string) {
       const ticket = await this._client.verifyIdToken({
           idToken,
           audience: process.env.GOOGLE_CLIENT_ID,
       });

      const payload = ticket.getPayload();
      if(!payload) throw new Error("Invalid Google token");
      return {
         googleId: payload.sub,
         email: payload.email,
         name: payload.name,
         picture: payload.picture
       }
    
    }
}