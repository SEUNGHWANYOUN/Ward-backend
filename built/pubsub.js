"use strict";
// import { PubSub } from "apollo-server-express";
Object.defineProperty(exports, "__esModule", { value: true });
// const pubsub = new PubSub();
// export default pubsub;
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
//import * as Redis from 'ioredis';
const Redis = require('ioredis');
//var host =process.env.REDIS_URL;
const options = {
    host: "redis-12337.c290.ap-northeast-1-2.ec2.cloud.redislabs.com",
    port: "12337",
    //username: "postgresql",
    password: "Felc44rml7wcGCYPDexukSmAvSrpw6TF",
    dbname: "redis-test",
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});
exports.default = pubsub;
//# sourceMappingURL=pubsub.js.map