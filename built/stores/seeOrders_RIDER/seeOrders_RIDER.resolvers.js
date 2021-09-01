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
    Query: {
        seeOrders_RIDER: users_utils_1.protectedResolver((_, { address }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            return client_1.default.order.findMany({
                where: {
                    address,
                    OR: [
                        {
                            status: {
                                not: "Pending",
                            },
                        },
                        // {
                        //     riderId:loggedInUser.id
                        // },
                        // {
                        //     riderId:null
                        // },
                    ]
                    //추가로 아직 라이더가 잡히지 않은거
                    // OR:[
                    //     {
                    //         //수거할 배탕 용품
                    //         status:{
                    //             equals:"Apccept",
                    //         },
                    //     },
                    //     {
                    //         //배송해야할 배배탈
                    //         status:{
                    //             equals:"WC",
                    //         },
                    //     }
                    // ]
                },
            });
        }))
    }
};
//# sourceMappingURL=seeOrders_RIDER.resolvers.js.map