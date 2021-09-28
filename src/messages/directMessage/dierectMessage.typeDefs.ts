import {gql} from "apollo-server";

export default gql`
    type Query {
        # 상대방 유저 아이디 값
        dierectMessage( id: Int) : Room!
    }
`;