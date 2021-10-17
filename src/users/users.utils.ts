import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    //console.log(token)
    //console.log("getuser 토큰이여"+ JSON.parse(token))
    if (!token) {
      //console.log("토큰이 존재 않다고 판단함?")
      return null;
    }

    //인증처리 정상적으로 수행못함
    //console.log(token)
    //console.log(process.env.SECRET_KEY)

    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    
    //토큰을 통해 아이디값 추출 완료
    //console.log("인증된 아이디값은?"+id)
    const user = await client.user.findUnique({ where: { id } });

    //console.log("정상적으로 유저의 값은 구해서 오는지"+user);
    //console.log(user);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}
