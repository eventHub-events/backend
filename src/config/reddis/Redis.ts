


import Redis from "ioredis";
import { ENV } from "../../infrastructure/config/common/env";

class RedisClient {
  private static instance: Redis | null = null;

  static getInstance(): Redis {
    if (!RedisClient.instance) {
      console.log("🚀 Initializing Redis...");

      if (ENV.REDIS_URL) {
        
        RedisClient.instance = new Redis(ENV.REDIS_URL, {
          tls: {},
          maxRetriesPerRequest: null,   // 🔥 stop retry error
          retryStrategy: () => null,    // 🔥 stop reconnect spam
          reconnectOnError: () => false // 🔥 no infinite reconnect
        });
      } else {
         
        RedisClient.instance = new Redis({
          host: ENV.REDIS_HOST || "127.0.0.1",
          port: Number(ENV.REDIS_PORT) || 6379,
          maxRetriesPerRequest: null,
          retryStrategy: () => null,
          reconnectOnError: () => false
        });
      }

      RedisClient.instance.once("connect", () => {
        console.log("✅ Redis connected");
      });

      RedisClient.instance.once("error", (err) => {
        console.error("❌ Redis failed once:", err.message);
      });
    }

    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();


// // import Redis from 'ioredis';
// // import { ENV } from '../../infrastructure/config/common/env';

// // const redis = new Redis({
// //   host: ENV.REDIS_HOST,
// //   port: Number(ENV.REDIS_PORT),
// // });
// // redis.on('connect', () => console.log('✅ Redis connected'));
// // redis.on('error', err => console.error('❌ Redis Error:', err));

// // export default redis;


// import Redis from "ioredis";
// import { ENV } from "../../infrastructure/config/common/env";

// console.log("REDIS_URL from env =", ENV.REDIS_URL);

// let redis: Redis;

// if (ENV.REDIS_URL) {
//    console.log(ENV.REDIS_URL)
//   // 🔥 production (Render / cloud)
//   redis = new Redis(ENV.REDIS_URL);
// } else {
//   // 🟢 local development
//   redis = new Redis({
//     host: ENV.REDIS_HOST,
//     port: Number(ENV.REDIS_PORT),
//   });
// }

// redis.on("connect", () => console.log("✅ Redis connected"));
// redis.on("error", (err) => console.error("❌ Redis Error:", err));

// export default redis;