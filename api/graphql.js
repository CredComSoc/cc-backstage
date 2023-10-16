const { buildSchema } = require("graphql")
const {MongoClient, ObjectId} = require('mongodb')
import {CC_BACKEND_URL, DB_FOLDER, DB_URL} from './config.js'
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
    type Article{
        id: String
        title: String
        longDesc: String
        article: String
        category: String
        status: String
        destination: String
        price: String
        uploadDate: String
        userUploader: String
        userId: String
    }
    type Query{
        username: String
        user: User
        member(id: Int, name: String): Member
        allMembers: [Member]
        allUserArticles(accountName: String!): [Article]
        userCount: Int
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
     email: "bob.brown@example.com"},
     {
     id:4,
     name: "Lasse Liten",
     balance: 100,
     status: "Online",
     phone: 33333,
     email: "liten.lars@example.com"},
     {
     id:5,
     name: "Mr Krister",
     balance: 100,
     status: "Online",
     phone: 33333,
     email: "mr.krister@example.com"},
     {
     id:6,
     name: "Adam Adelsabel",
     balance: 100,
     status: "Online",
     phone: 33333,
     email: "scuffed.doe@example.com"
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
    //Now from Credit Coop backend
    // This call necessarily fetches a lot of information
    // I've been unable  to find a call which fetches solely the allMembers
    // Either we can find a way to call seperately to get only what we need
    // or find a way to utilize this large amount of data (Some clever system or caching? Perhaps it is possible for the data recieved to "follow" the user to whichever page it goes to using something in vue)
    //What the fetch actually returns:
    /*
      user: {},
      myArticles: [],
      myCart: [],

      allMembers: [],
      allArticles: [],

      saldo: 0,
      creditLine: 0,

      requests: [],
      pendingPurchases: [],
      completedTransactions: [],
      allEvents: []


    const member_arr = await fetch(CC_BACKEND_URL + '/data', {
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

      return member_arr.allMembers
      */
     var allMembers = []
     const db = await MongoClient.connect(DB_URL)
     const dbo = db.db(DB_FOLDER)
     var users = await dbo.collection("users").find({}).toArray()
     for (const user of users) {
        let userData = user.profile
        userData.is_admin = user.is_admin
        userData.email = user.email
        //Get balance information from CC-node using ID from user._id
        //As well as necessary logic for this.
        allMembers.push(userData)
    }
    console.log(allMembers)
    return allMembers
    //return members
}

async function getUserArticles(username){ // Get all article data related to a user
    /*console.log(username.accountName)
    const member_arr = await fetch(CC_BACKEND_URL + '/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        user: username.accountName
      }).then((response) =>{
        return response.json()
      }).catch(() => {
        return false
      })
      console.log(member_arr)
      return member_arr.allArticles*/
        console.log(username)
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)//Simple query returning all posts that the user has uploaded
        let articles = await dbo.collection("posts").find({"userUploader": username.accountName}).toArray()
        console.log(articles)
        return articles
    }

async function getAllArticles(){ // Get all posts
    const db = await MongoClient.connect(DB_URL)
    const dbo = db.db(DB_FOLDER)
    let articles = await dbo.collection("posts").find({}).toArray()
    return articles
}

async function getUserCount(){ // Get how many users that are not admins are in the database
    const db = await MongoClient.connect(DB_URL)
    const dbo = db.db(DB_FOLDER)
    let count = await dbo.collection("users").countDocuments({"is_admin": false})
    return count
}

// getOffers calling CCbackend/articles with user as input
// Get offers related to a specific user from the CC-backend

//getTransactions - calling backend or better to call the node directly?
// Get transactions related to a specific user from the CC-node

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
    allUserArticles: ({accountName}) => {
        return getUserArticles({accountName})
    },
    userCount: () => {
        return getUserCount()
    },

}


module.exports = {schema, root}