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
const pubsub_1 = __importDefault(require("../../pubsub"));
const constants_1 = require("../../constants");
exports.default = {
    Mutation: {
        statusUpdate: users_utils_1.protectedResolver((_, { id, status }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(status);
                //오더라면 스토어 가기 주인인지 확인해 주고
                if (loggedInUser.role === "OWNER") {
                    console.log("여기오노?_OWNER");
                    const order = yield client_1.default.order.findFirst({
                        where: {
                            store: {
                                userId: loggedInUser.id,
                            }
                        }
                    });
                    if (!order) {
                        return {
                            ok: false,
                            error: "가지고 있는 (가게)권한이 없습니다."
                        };
                    }
                    //라이더라면 상태값을 바꾸면서 아이디 값을 본인 값을 넣어준다
                }
                else if (loggedInUser.role === "RIDER") {
                    console.log("여기오노?_RIDER");
                    //만약에 상태값이 Apccept 라면 아직 라이더가 잡지 않은 상태라고 판단하여 본인의 아이디 값을 넣어준다
                    if (status === "Apccept") {
                        yield client_1.default.order.update({
                            where: {
                                id,
                            },
                            data: {
                                riderId: loggedInUser.id,
                            }
                        });
                    }
                    //상태값이 다른 값이라면 본인의 잡아둔 배달인지 확인해 준다
                    const order_RIDER = yield client_1.default.order.findFirst({
                        where: {
                            riderId: loggedInUser.id,
                        }
                    });
                    if (!order_RIDER) {
                        return {
                            ok: false,
                            error: "내가 소유한 배달이 아닙니다."
                        };
                    }
                }
                //상태값 변경
                if (status === "Pending") {
                    status = "Apccept";
                }
                else if (status === "Apccept") {
                    status = "Collecting";
                }
                else if (status === "Delivery") {
                    status = "DC";
                }
                else if (status === "Collecting") {
                    status = "CC";
                }
                else if (status === "CC") {
                    status = "Washing";
                }
                else if (status === "Washing") {
                    status = "WC";
                }
                else if (status === "WC") {
                    status = "Delivery";
                }
                const status_update = yield client_1.default.order.update({
                    where: {
                        id: id,
                    },
                    data: {
                        status,
                    }
                });
                //   if(!status_update){
                //     return{
                //         ok :false,
                //         error: "수정할 주문이 없습니다."
                //       }
                //   }
                //갱신할수 있도록 해당 내영올
                pubsub_1.default.publish(constants_1.NEW_ORDER, { orderUpdates: Object.assign({}, status_update) });
                //ok로 오면 화면 재갱신
                return {
                    ok: true
                };
            }
            catch (error) {
                return {
                    ok: false,
                    error: "상태값을 수정할 수 없습니다." + error
                };
            }
        })),
    },
};
//# sourceMappingURL=statusUpdate.resolvers.js.map