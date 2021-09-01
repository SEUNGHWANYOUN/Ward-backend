"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
 type Mutation{
    statusUpdate(id: Int!, status: String!): MutationResponse!
 }
`;
//# sourceMappingURL=statusUpdate.typeDefs.js.map