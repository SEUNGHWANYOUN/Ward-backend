"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
exports.default = {
    Store: {
        user: ({ id }) => client_1.default.store.findUnique({ where: { id } }).user(),
        products: ({ id }) => client_1.default.store.findUnique({ where: { id } }).products(),
        orders: ({ id }) => client_1.default.store.findUnique({ where: { id } }).orders(),
    },
    Product: {},
    Order: {
        // order list 에서 추가적인 정보 및 다이렉트 메시지 보내기 위해여 6/ 18일 추가
        user: ({ id }) => client_1.default.order.findUnique({ where: { id } }).user(),
        // order list 에서 추가적인 정로블 보기 위해여 6/18 일 추가 
        store: ({ id }) => client_1.default.order.findUnique({ where: { id } }).store(),
        //user: ({ userId }) => client.order.findUnique({ where: { id :userId } }).user(),
        order_items: ({ id }) => client_1.default.order.findUnique({ where: { id } }).order_items(),
    },
    Order_Item: {
    // productId: ({ id }) => client.order_Item.findUnique({ where: { id } }).product(),
    }
};
//# sourceMappingURL=stores.resolvers.js.map