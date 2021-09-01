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
const users_utils_1 = require("../users.utils");
const resolverFn = (_, { address, address_detail, roadAddress, roadAddress_detail }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield client_1.default.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            address,
            address_detail,
            roadAddress,
            roadAddress_detail
        },
    });
    if (updatedUser.id) {
        return {
            ok: true,
        };
    }
    else {
        return {
            ok: false,
            error: "Could not update profile.",
        };
    }
});
exports.default = {
    Mutation: {
        editProfileAdress: users_utils_1.protectedResolver(resolverFn),
    },
};
//# sourceMappingURL=editeProfileAdress.resolvers.js.map