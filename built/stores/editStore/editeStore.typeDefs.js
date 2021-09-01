"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
    type Mutation {
        editStore(id: Int,mainimg: String!, name: String!, address: String!, phone: String!): MutationResponse!
    }
`;
//# sourceMappingURL=editeStore.typeDefs.js.map