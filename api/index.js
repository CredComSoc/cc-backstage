const express = require('express')
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Schema for the GraphQL
let schema = buildSchema(`

    type User{
        username: String
        balance: Int
        transactions:[String]
    }
    type Query{
        username: String
        user: User
    }

`)
var root ={
    username: () => {
        return "Testusername"
    },
    user: () =>{
        let data = {
            username: "Testname",
            balance: 100,
            transactions:[]
        }
        data.transactions.push("1 currency for 1 food")
        return data

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