"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeOrders_OWNER: (_, { id }) => client_1.default.order.findMany({
            where: {
                storeId: id,
            }
        }),
    }
};
//# sourceMappingURL=seeOrders_OWNER.resolvers.js.map