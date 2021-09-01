"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Mutation {
    editProfileAdress(
      address: String
      address_detail: String!
      roadAddress: String
      roadAddress_detail: String!
      
    ): MutationResponse!
  }
`;
//# sourceMappingURL=editProfileAdress.typeDefs.js.map