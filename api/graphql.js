const { buildSchema } = require("graphql")
const {MongoClient, ObjectId} = require('mongodb')
import {CC_BACKEND_URL, DB_FOLDER, DB_URL} from './config.js'
/*In the schema below, objects can be defined for GraphQL to use in queries or mutations*/
let schema = buildSchema(`

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
        member(id: Int, accountName: String): Member
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


async function getMember({id, accountName}) { // Get a single member, selected by either id or name
    //Now from array, later from Credit Coop backend
    console.log(accountName)
    const db = await MongoClient.connect(DB_URL) //Connect to the mongoDB
    const dbo = db.db(DB_FOLDER)    // state the correct folder in the DB
    var user = await dbo.collection("users").findOne({"profile.accountName": accountName}) //Get the data from the mongoDB based on the collection name and the query in findOne/find
    let userData = user.profile //For users, unecessary information such as Password is not to be sent back to the frontend
    userData.is_admin = user.is_admin
    userData.email = user.email
    let date = new Date(userData.last_online) // Converting the UNIX time to a readable date
    userData.last_online = date.toLocaleDateString() // The time of day is lost at the moment but perhaps there is an efficient way to include it all.
    console.log(userData)
    return userData

}

async function getAllMembers(){ // Get a list of all the members

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
        let date = new Date(userData.last_online)
        userData.last_online = date.toLocaleDateString()
        allMembers.push(userData)
    }
    console.log(allMembers)
    return allMembers
    //return members
}

async function getUserArticles(username){ // Get all article data related to a user
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
    member: ({id, accountName}) => { // A query that should try to match what information the app needs about a single member
        return getMember({id, accountName})
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