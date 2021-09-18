// import { PubSub } from "apollo-server-express";


// const pubsub = new PubSub();

// export default pubsub;


import { RedisPubSub } from 'graphql-redis-subscriptions';
//import * as Redis from 'ioredis';
const Redis = require('ioredis')
//var host =process.env.REDIS_URL;

const options = {
  host: "redis-12337.c290.ap-northeast-1-2.ec2.cloud.redislabs.com",
  port: "12337",
  //username: "postgresql",
  password:"Felc44rml7wcGCYPDexukSmAvSrpw6TF",
  dbname:"redis-test",
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

export default pubsub;

 