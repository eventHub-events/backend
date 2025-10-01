import { ITokenService } from "../../../application/interface/user/ITokenService";
import jwt from "jsonwebtoken";
import { IUserTokenPayload } from "../../interface/IUserTokenPayload";
import { ITokenConfig } from "../../../application/interface/user/ITokenConfig";


export class JWTToken implements ITokenService{
  constructor(

       private _config: ITokenConfig

  ){}
   async generateToken( payload: object ): Promise< string > {

      const token = jwt.sign( payload, this._config.jwtSecret, {expiresIn: this._config.accessTokenExpiry } );

      return token

   }

    async generateResetToken( payload:object ): Promise< string > {

      const token=  jwt.sign(payload, this._config.jwtSecret, {expiresIn: this._config.resetTokenExpiry});
      return token;
  }
   
   async generateRefreshToken( payload: object ): Promise< string > {

       const token= jwt.sign( payload, this._config.jwtSecret, { expiresIn: this._config.refreshTokenExpiry });
       return token;

   }
   async verifyToken( token:string ): Promise< IUserTokenPayload > {
    
      return  jwt.verify( token, this._config.jwtSecret ) as IUserTokenPayload;
    
    }

    async verifyRefreshToken( token: string ): Promise< IUserTokenPayload > {

      return  jwt.verify( token, this._config.jwtSecret ) as IUserTokenPayload;
    
    }

   }
