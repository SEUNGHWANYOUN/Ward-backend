import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  // id : 방번호
  // 방번호안에 해당 아이디가 있다면 보여줌 
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
