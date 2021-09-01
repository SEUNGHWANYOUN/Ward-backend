"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Mutation {
    createStore(
            name: String! 
            mainimg: Upload!
            address: String
            phone: String
    ): MutationResponse!
  }
`;
//# sourceMappingURL=createStore.typeDefs.js.map