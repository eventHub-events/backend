import bcrypt from 'bcrypt';

import { IHashService } from '../../../application/interface/useCases/user/IHashService';

export class BcryptHashService implements IHashService {
  async hash(data:string):Promise<string> {
    console.log("dataaaa",data)
    return bcrypt.hash(data, 10);
  }

  async compare(data:string, hashed:string) {
    return bcrypt.compare(data, hashed);
  }
}
