import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    //해당 채팅방 조회시 나와 그사람외 나무사람도 없는 방을 찾아야함
    //[햔재] 그냥 그사람과 놔와 있는 방에서 첫번째로 검색된 방을 구성함
  Query: {
    dierectMessage: protectedResolver(async (_, {id}, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          users: {
            some: {                 
                    id 
            },
          },
        },
      })
    ),
  },
};
