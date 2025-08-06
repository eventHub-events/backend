import { IHashService } from '../../../application/interface/user/IHashService';

export class HashService {
  constructor(private _hashServiceAlgorithm:IHashService) {}

  async hash(data:string):Promise<string> {
    const hashed = await this._hashServiceAlgorithm.hash(data);
    return hashed;
  }

  async compare(data:string, hashed:string):Promise<boolean> {
    return this._hashServiceAlgorithm.compare(data, hashed);
  }
}
