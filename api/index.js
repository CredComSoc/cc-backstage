const express = require('express')
import { createHandler } from "graphql-http/lib/use/express" // https://www.npmjs.com/package/graphql-http
// npm install express, graphql, graphql-http
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const {schema, root} = require('./graphql.js')

app.use(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)

app.listen(4000)


export default{
    path: '/api',
    handler: app
}