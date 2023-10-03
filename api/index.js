const express = require('express')
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// TODO: Move to a seperate file so Express and Graphql are seperated
// Schema for the GraphQL
let schema = buildSchema(`

    type User{
        username: String
        balance: Int
        transactions:[String]
    }
    type Member{
        id: Int
        name: String
        balance: Int
        status: String
        phone: Int
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


`)  // add to schema: user that has "Member Name, Balance, Status, Phone Number"
    // Transactions involving one specific member.
    // Send how many members are online
    // Send how many transactions were done on specific days
const members = [
   {id:1,
    name: "exempel",
    balance: 100,
    status: "Online",
    phone: 33333},
    {id:2,
        name: "Namnet",
        balance: 200,
        status: "Offline",
        phone: 33333}
]


async function getMember({id, name}) {
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

async function getAllMembers(){
    //Now from array, later from Credit Coop backend
    return members
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
    allMembers: () => {
        return getAllMembers()
    },
}
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // Disable when no longer developing
    })
)

app.get('/example', function (req, res){ // initial
    let data = {
        username: {},
        example: {},
        transactions: [],
    }
    data.username = "First Last"
    data.example = "Last active 5 min"
    data.transactions.push("5 wheels of cheese")
    data.transactions.push("10 gallons of water")
    res.send(data)
})



app.listen(4000)

export default{
    path: '/api',
    handler: app
}