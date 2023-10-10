const { buildSchema } = require("graphql")
/*In the schema below, objects can be defined for GraphQL to use in queries or mutations*/
let schema = buildSchema(`

    type User{
        username: String
        balance: Int
        transactions:[String]
    }
    type Billing{
        name: String
        box: String
        address: String
        orgNumber: String
    }
    type Member{
        id: Int
        accountName: String
        is_admin: Boolean
        email: String
        description: String
        address: String
        city: String
        phone: String
        billing: Billing
        last_online: String
    }
    type Entry{
        payer: Int
        payee: Int
        amount: Int
        description: String
        author: String
        metadata: String
    }
    type Transaction{
        id: Int
        version: Int
        state: String
        type: String
        entries: [Entry]
    }
    type Query{
        username: String
        user: User
        member(id: Int, name: String): Member
        allMembers: [Member]
    }



`)


    // add to schema: user that has "Member Name, Balance, Status, Phone Number"
    // Transactions involving one specific member.
    // Send how many members are online
    // Send how many transactions were done on specific days
const members = [
   {
    id:1,
    name: "John Doe",
    balance: 100,
    status: "Online",
    phone: 33333,
    email: "john.doe@example.com"},
    {
    id:2,
    name: "Jane Smith",
    balance: 200,
    status: "Offline",
    phone: 33333,
    email: "jane.smith@example.com"},
    {
    id:3,
    name: "Bob Brown",
    balance: 300,
    status: "Away",
    phone: 50302,
    email: "bob.brown@example.com"
    }
]


async function getMember({id, name}) { // Get a single member, selected by either id or name
    //Now from array, later from Credit Coop backend
    var temp_member
    var arg
    if(id!=null){
        var temp_member = members.reduce((x, member) => x.set(member.id, member), new Map())
        var arg = id
    }else if(name!=null){
        var temp_member = members.reduce((x, member) => x.set(member.name, member), new Map())
        var arg = name
    }else{
        return null
    }

    return temp_member.get(arg)

}

async function getAllMembers(){ // Get a list of all the members
    //Now from array, later from Credit Coop backend
    const member_arr = await fetch("http://localhost:3000" + '/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((response) =>{
        return response.json()
      }).catch(() => {
        return false
      })
      console.log(member_arr)
      console.log("2")
      console.log(member_arr.allMembers)
      return member_arr.allMembers
    //return members
}

async function addNewMember(input){
    members.push(input)
}

var root ={
    username: () => {
        return "Testusername"
    },
    user: () =>{ // Temporary type for testing purposes
        let data = {
            username: "Testname",
            balance: 100,
            transactions:[]
        }
        data.transactions.push("1 currency for 1 food")
        return data
    },
    member: ({id, name}) => { // A query that should try to match what information the app needs about a single member
        return getMember({id, name})
    },
    allMembers: () => { // A Query that returns all members
        return getAllMembers()
    },

}


module.exports = {schema, root}