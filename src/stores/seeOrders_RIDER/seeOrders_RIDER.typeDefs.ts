import { gql } from "apollo-server";

export default gql`
 type Query {
     seeOrders_RIDER(address: String) :[Order]
 }
`;