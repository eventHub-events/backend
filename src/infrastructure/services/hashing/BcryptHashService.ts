import bcrypt from "bcrypt";

import { IHashService } from "../../../application/interface/user/IHashService";

export class BcryptHashService implements IHashService {

  async hash(data:string):Promise<string>{
    return await bcrypt.hash(data,10)
  }
  async compare(data:string,hashed:string){
     return await bcrypt.compare(data,hashed) 
  }

}