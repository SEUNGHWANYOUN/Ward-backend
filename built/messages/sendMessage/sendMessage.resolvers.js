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
const constants_1 = require("../../constants");
const pubsub_1 = __importDefault(require("../../pubsub"));
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Mutation: {
        sendMessage: users_utils_1.protectedResolver((_, { payload, roomId, userId }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            let room = null;
            console.log("메시지" + payload + "방번호" + roomId + "유저아이디" + userId);
            if (userId) {
                console.log("유저 아이디 실행됨?");
                const user = yield client_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        id: true,
                    },
                });
                if (!user) {
                    return {
                        ok: false,
                        error: "This user does not exist.",
                    };
                }
                room = yield client_1.default.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: userId,
                                },
                                {
                                    id: loggedInUser.id,
                                },
                            ],
                        },
                    },
                });
                console.log("durl 실행됨?");
            }
            else if (roomId) {
                room = yield client_1.default.room.findUnique({
                    where: {
                        id: roomId,
                    },
                    select: {
                        id: true,
                    },
                });
                if (!room) {
                    return {
                        ok: false,
                        error: "Room not found.",
                    };
                }
            }
            const message = yield client_1.default.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id,
                        },
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });
            console.log(message);
            pubsub_1.default.publish(constants_1.NEW_MESSAGE, { roomUpdates: Object.assign({}, message) });
            console.log("여기까지 실행됨?");
            return {
                ok: true,
                id: message.id,
            };
        })),
    },
};
//# sourceMappingURL=sendMessage.resolvers.js.map