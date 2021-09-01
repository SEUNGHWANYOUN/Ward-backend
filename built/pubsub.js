"use strict";
// import { PubSub } from "apollo-server-express";
Object.defineProperty(exports, "__esModule", { value: true });
// const pubsub = new PubSub();
// export default pubsub;
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
//import * as Redis from 'ioredis';
const Redis = require('ioredis');
const options = {
    host: "127.0.0.1",
    port: "6379",
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