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
const shared_utils_1 = require("../../shared/shared.utils");
const users_utils_1 = require("../../users/users.utils");
const photos_utils_1 = require("../photos.utils");
exports.default = {
    Mutation: {
        uploadPhoto: users_utils_1.protectedResolver((_, { file, caption }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            let hashtagObj = [];
            if (caption) {
                hashtagObj = photos_utils_1.processHashtags(caption);
            }
            console.log(file);
            const fileUrl = yield shared_utils_1.uploadToS3(file, loggedInUser.id, "uploads");
            yield client_1.default.photo.create({
                data: Object.assign({ file: fileUrl, caption, user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    } }, (hashtagObj.length > 0 && {
                    hashtags: {
                        connectOrCreate: hashtagObj,
                    },
                })),
            });
        })),
    },
};
//# sourceMappingURL=uploadPhoto.resolvers.js.map