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
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const users_utils_1 = require("./users/users.utils");
const PORT = process.env.PORT || 5000;
const RootSchema = apollo_server_express_1.gql `
     extend type Query {
      root: String
  }

`;
const RootResolver = {
    Dumy: {
        root: () => 'Root resolver is running!',
    },
};
const apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: [schema_1.typeDefs, RootSchema],
    resolvers: [schema_1.resolvers],
    playground: true,
    introspection: true,
    context: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(ctx.req);
        if (ctx.req) {
            return {
                loggedInUser: yield users_utils_1.getUser(ctx.req.headers.token),
            };
        }
        else {
            const { connection: { context }, } = ctx;
            return {
                loggedInUser: context.loggedInUser,
            };
        }
    }),
    //메세지를 읽는 거에 대한 인증 처리 로그인된 유저가 채팅을 사용한 유저가 맞는지 검사
    subscriptions: {
        // onConnect: async ( token ) => {
        //Jsone string으로 해당 타입이 null일수도 있음을 암시
        onConnect: ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
            //console.log(token);
            if (!token) {
                throw new Error("You can't listen.");
            }
            //JSON 값을 전환해 주는 과정
            //const token_string = JSON.stringify(token);
            //const token_parse = JSON.parse(token_string).token;
            //console.log("token string 으로 전환" +token_string);
            //console.log(tokent_pase)
            //token을 json 값으로 전달해줘서 정상적으로 유저의 값을 구하지 못함
            //const loggedInUser = await getUser(token);
            //String 값으로 전환해서 넣어주기
            const loggedInUser = yield users_utils_1.getUser(token);
            // console.log("인증된 유저의 정보값")
            //값널처리
            //console.log(loggedInUser)
            return {
                loggedInUser,
            };
        }),
    },
});
let app = express_1.default();
app.use(morgan_1.default("dev"));
apollo.applyMiddleware({ app });
app.use("/static", express_1.default.static("uploads"));
const httpServer = http_1.default.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀Server is running on http://localhost:${PORT} good!!!!✅`);
});
//# sourceMappingURL=server.js.map