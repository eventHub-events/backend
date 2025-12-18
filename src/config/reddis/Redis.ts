import Redis from 'ioredis';
import { ENV } from '../../infrastructure/config/common/env';

const redis = new Redis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
});
redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', err => console.error('❌ Redis Error:', err));

export default redis;
