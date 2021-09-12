"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const pubsub = new apollo_server_express_1.PubSub();
exports.default = pubsub;
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// //import * as Redis from 'ioredis';
// const Redis = require('ioredis')
// //var host =process.env.REDIS_URL;
// const options = {
//   host: "database-1.cwctaqcu532i.ap-northeast-2.rds.amazonaws.com",
//   port: "5432",
//   username: "postgresql",
//   password:"postgresql",
//   dbname:"postgres",
//   retryStrategy: times => {
//     // reconnect after
//     return Math.min(times * 50, 2000);
//   }
// };
// const pubsub = new RedisPubSub({
//   publisher: new Redis(options),
//   subscriber: new Redis(options)
// });
// export default pubsub;
//# sourceMappingURL=pubsub.js.map