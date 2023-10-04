const express = require('express')
const { graphqlHTTP } = require("express-graphql")
// npm install express, graphql, express-graphql
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// TODO: Move to a seperate file so Express and Graphql are seperated
// Schema for the GraphQL

const {schema, root} = require('./graphql.js')

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
    res.send(data)
})


app.listen(4000)


export default{
    path: '/api',
    handler: app
}