"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeStores: (_, { address }) => __awaiter(void 0, void 0, void 0, function* () {
            const dsa = address.split(" ");
            const address_search = dsa[0] + " " + dsa[1] + " " + dsa[2];
            const result = yield client_1.default.$queryRaw('SELECT * FROM "Store" WHERE address ilike $1 ORDER BY state DESC', // Using %$2 here would not work
            `%${address_search}%`);
            return result;
        })
    }
    // client.store.findMany({
    //     where:{
    //         address
    //     },
    // }),
    //}
};
//# sourceMappingURL=seeStores.resolvers.js.map