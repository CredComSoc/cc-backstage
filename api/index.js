const express = require('express')
import { createHandler } from "graphql-http/lib/use/express" // Module to use graphql in express
// for this backend, npm install express graphql graphql-http
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const {schema, root} = require('./graphql.js')

app.use( //Using the schema and resolver as defined in /api/graphql.js
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)

app.listen(4000) //Port the backend listens to


export default{
    path: '/api',
    handler: app
}