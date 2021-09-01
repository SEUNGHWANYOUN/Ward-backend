"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
 type Subscription {
  #  배열로했을때 값 못가져옴 error 이상하게 나옴 찾을수 없다고 orderUpdates
   orderUpdates(id: Int!): Order
 }
`;
//# sourceMappingURL=orderUpdates.typeDefs.js.map