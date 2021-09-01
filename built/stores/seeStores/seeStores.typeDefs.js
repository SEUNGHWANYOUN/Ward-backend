"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Query{
      seeStores(address: String!): [Store]
  }
`;
//# sourceMappingURL=seeStores.typeDefs.js.map