import client from "../../client"

export default {
    Query :{
        userList: async() =>  
        //const dsa =address.split(" ");
        //const address_search = dsa[0]+" "+dsa[1]+" "+dsa[2];
       // const result = await client.$queryRaw`SELECT * FROM "User"`

        // console.log(result)
        // return result;
        await client.user.findMany()
        
        


        }  
}