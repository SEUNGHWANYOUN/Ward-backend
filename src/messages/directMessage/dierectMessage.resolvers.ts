import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
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
