require("dotenv").config();
import  http from "http";
import express, { json } from "express";
import logger from "morgan";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";


const PORT = process.env.PORT || 5000;
const RootSchema = gql`
     extend type Query {
      root: String
  }

`;
const RootResolver = {
  Dumy: {
    root: () => 'Root resolver is running!',
  },
};


const apollo = new ApolloServer({ 
  typeDefs: [typeDefs, RootSchema],
  resolvers: [resolvers], 
  playground : true,
  introspection : true,
  context: async (ctx) => {
    //console.log(ctx.req);
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },

  //메세지를 읽는 거에 대한 인증 처리 로그인된 유저가 채팅을 사용한 유저가 맞는지 검사
  subscriptions: {
    // onConnect: async ( token ) => {
      //Jsone string으로 해당 타입이 null일수도 있음을 암시
      onConnect: async ( {token}:{token?:string} ) => {
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
      const loggedInUser = await getUser(token);
     // console.log("인증된 유저의 정보값")
      //값널처리
      //console.log(loggedInUser)
      return {
        loggedInUser,
      };
    },
  },
});


let app = express();
app.use(logger("dev"));
apollo.applyMiddleware({ app }); 
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} good!!!!✅`);
});
