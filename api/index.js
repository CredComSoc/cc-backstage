const express = require('express')
const { graphqlHTTP } = require("express-graphql")
const bodyParser = require('body-parser')
const {MongoClient, ObjectId} = require('mongodb')
const {axios} = require ('axios')
import {CC_BACKEND_URL, CC_NODE_URL, DB_FOLDER, DB_URL } from './config.js'
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

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/transactions', async function (req, res){ // initial

    let db = await MongoClient.connect(DB_URL)
      let dbo = db.db(DB_FOLDER);
      const allUsers = await dbo.collection("users").find({}).toArray(); // created this variables of users because the old implementation loops through all the transactions that it got from the cc-node and to map the users every time it called the get user api but now it gets it from this variable
      const user = await dbo.collection("users").findOne({ "profile.accountName": req.user })
      const userId = "650c251a911cc0132256925b"
      let transactions = {
        requests: [],
        pendingPurchases: [],
        completedTransactions: [],
      }
      // get requests
      console.log("here")

          const response = await fetch(CC_NODE_URL + '/transactions', {
            method: "GET",
            headers: {
              'cc-user': userId, //
              'cc-auth': '1'
            },
            params: {
              'payee': userId
            },
            credentials: 'include'
          }).then(r => r.json())
           .then(data => console.log(data))
          let users = {}
          let entries = response.data.data || []
          for (const entry of entries) {
            if ((entry.entries[0].payee !== undefined) && !(entry.entries[0].payee in users)) {
              const payee = allUsers.filter(us => us["_id"].toString() == entry.entries[0].payee)[0]
              // const payee = await getUser({ '_id': ObjectId(entry.entries[0].payee) })
              users[entry.entries[0].payee] = payee.profile.accountName
            }
            if ((entry.entries[0].payer !== undefined) && !(entry.entries[0].payer in users)) {
              const payer = allUsers.filter(us => us["_id"].toString() == entry.entries[0].payer)[0]
              // const payer = await getUser({ '_id': ObjectId(entry.entries[0].payer) })
              users[entry.entries[0].payer] = payer.profile.accountName
            }
            if ((entry.entries[0].author !== undefined) && !(entry.entries[0].author in users)) {
              const author = allUsers.filter(us => us["_id"].toString() == entry.entries[0].author)[0]
              // const author = await getUser({ '_id': ObjectId(entry.entries[0].author) })
              users[entry.entries[0].author] = author.profile.accountName
            }
            entry.entries[0].payee = users[entry.entries[0].payee]
            entry.entries[0].payer = users[entry.entries[0].payer]
            entry.entries[0].author = users[entry.entries[0].author]
            if (entry.state === 'completed') {
              // this is the new cc-server returns quantity with display format so removing the display format is done below to send integer value to the front end
              entry.entries[0].quant = cleanQuantityData(entry.entries[0].quant)
              transactions.completedTransactions.push(entry)
            } else if (entry.state === 'pending') {
              entry.entries[0].quant = cleanQuantityData(entry.entries[0].quant)
              transactions.requests.push(entry)
            }
          }
          console.log("1:" + entries)

         response = await fetch(CC_NODE_URL + '/transactions', {
          method: "GET",
          headers: {
            'cc-user': "bob",
            'cc-auth': '123'
          },
          params: {
            'payer': "bob"
          },
          credentials: 'include'
        }).then(r => r.json())
          .then(data => console.log(data))
         users = {}
         entries = response.data.data || []
        for (const entry of entries) {
          if ((entry.entries[0].payee !== undefined) && !(entry.entries[0].payee in users)) {
            const payee = allUsers.filter(us => us["_id"].toString() == entry.entries[0].payee)[0]
            // const payee = await getUser({ '_id': ObjectId(entry.entries[0].payee) })
            users[entry.entries[0].payee] = payee.profile.accountName
          }
          if ((entry.entries[0].payer !== undefined) && !(entry.entries[0].payer in users)) {
            const payer = allUsers.filter(us => us["_id"].toString() == entry.entries[0].payer)[0]
            // const payer = await getUser({ '_id': ObjectId(entry.entries[0].payer) })
            users[entry.entries[0].payer] = payer.profile.accountName
          }
          if ((entry.entries[0].author !== undefined) && !(entry.entries[0].author in users)) {
            const author = allUsers.filter(us => us["_id"].toString() == entry.entries[0].author)[0]
            // const author = await getUser({ '_id': ObjectId(entry.entries[0].author) })
            users[entry.entries[0].author] = author.profile.accountName
          }
          entry.entries[0].payee = users[entry.entries[0].payee]
          entry.entries[0].payer = users[entry.entries[0].payer]
          entry.entries[0].author = users[entry.entries[0].author]

          if (entry.state === 'completed') {
            entry.entries[0].quant = cleanQuantityData(entry.entries[0].quant)
            transactions.completedTransactions.push(entry)
          } else if (entry.state === 'pending') {
            entry.entries[0].quant = cleanQuantityData(entry.entries[0].quant)
            transactions.pendingPurchases.push(entry)
          }
        }


      res.status(200).send(transactions)
      console.log(transactions)


})

app.get("/handshake", async (req, res) => {
  let response = await fetch(CC_NODE_URL + '/handshake', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cc-user': "650c2519911cc0132256925a",
      'cc-auth': '1'
    },
  })
  console.log(response)
})

app.get("/login", async (req, res) => {
  var email = req.email
  var password = req.password
  email = "admin@nowhere.com"
  password = "testpassword"
  return await fetch(CC_BACKEND_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password}),
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      return false
    } else {
      return true
    }
  }).catch(() => {
    return false
  })
})

app.post("/register", async (req, res) => {
    console.log(req.body)
})

app.listen(4000)


export default{
    path: '/api',
    handler: app
}