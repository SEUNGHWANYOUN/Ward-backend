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
const shared_utils_1 = require("../../shared/shared.utils");
exports.default = {
    Mutation: {
        createStore: users_utils_1.protectedResolver((_, { name, mainimg, phone, address }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const fileUrl = yield shared_utils_1.uploadToS3(mainimg, loggedInUser.id, "stores");
                const ok = yield client_1.default.store.create({
                    data: {
                        name,
                        mainimg: fileUrl,
                        phone,
                        address,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            }
                        },
                    },
                });
                return {
                    ok: true
                };
            }
            catch (e) {
                return {
                    ok: false,
                    error: "cant create store" + e,
                };
            }
        })),
    },
};
//# sourceMappingURL=createStore.resolvers.js.map