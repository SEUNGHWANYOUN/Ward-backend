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
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Mutation: {
        editStore: users_utils_1.protectedResolver((_, { id, address, name, phone, mainimg }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const ok = yield client_1.default.store.findFirst({
                where: {
                    id,
                    userId: loggedInUser.id,
                },
                // include : {
                //     products : {
                //         select :{
                //             photo: true,
                //             name: true,
                //             price : true,
                //             description: true,
                //             options: true,
                //         }
                //     }
                // }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Store is not found",
                };
            }
            yield client_1.default.store.update({
                where: {
                    id,
                },
                data: {
                    address,
                    phone,
                    mainimg,
                    name,
                    // products: {
                    // }
                }
            });
            return {
                ok: true,
            };
        })),
    }
};
//# sourceMappingURL=editeStore.resolvers.js.map