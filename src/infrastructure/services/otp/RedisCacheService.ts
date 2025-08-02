import redis from '../../../config/reddis/Redis';
import { ICacheService } from '../../interface/ICacheService';

export class RedisCacheService implements ICacheService {
  async set(key:string, expiry:number, value:string):Promise<void> {
    console.log('rediscacheService', key, expiry, value);
    const re = await redis.setex(key, expiry, value);
    console.log('re is', re);
  }

  async get(key:string):Promise<string | null> {
    const result = await redis.get(key);
    console.log('result in getex', result);
    return result;
  }

  async del(key:string):Promise<void> {
    await redis.del(key);
  }
}
