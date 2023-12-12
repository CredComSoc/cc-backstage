const { buildSchema } = require("graphql")
const { MongoClient, ObjectId } = require('mongodb')
import { CC_BACKEND_URL, DB_FOLDER, DB_URL, CC_NODE_URL, CC_NODE_ENABLED } from './config.js'
/*In the schema below, objects can be defined for GraphQL to use in queries or mutations*/
let schema = buildSchema(`

    type Billing{
        name: String
        box: String
        address: String
        orgNumber: String
    }
    type Member{
        id: String
        accountName: String
        is_admin: Boolean
        email: String
        description: String
        status: String
        balance: Int
        address: String
        city: String
        phone: String
        billing: Billing
        last_online: String
    }
    type EntryMeta{
        id: String
        quantity: Int
    }
    type Entry{
        payer: String
        payee: String
        quantity: String
        description: String
        metadata: EntryMeta
    }
    type Transaction{
        uuid: String
        date: String
        state: String
        type: String
        version: Int
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
    type Notification{
        _id: String
        date: String
        type: String
        toUser: String
        fromUser: String
        seen: Boolean
        amount: Int
        itemName: String
        itemCount: Int
        limitSurplusAmount: Int
    }
    type Query{
        member(id: Int, accountName: String): Member
        allMembers: [Member]
        allUserArticles(accountName: String!): [Article]
        allArticles: [Article]
        allTransactions: [Transaction]
        userTransactions(id: String!): [Transaction]
        userNotifications(name: String!): [Notification]
        userCount: Int
    }



`)


// add to schema: user that has "Member Name, Balance, Status, Phone Number"
// Transactions involving one specific member.
// Send how many members are online
// Send how many transactions were done on specific days

// Dummy CC-node transactions for when the node is not used
// Enable/disable the CC_NODE_ENABLED const in config.js to use
const allTransactions = [

    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-10-25 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c32356af5b95ceb1935ea",
                payer: "650c251a911cc0132256925b",
                quant: "$300",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "74b267cc-6d01-4314-b542-645addde305f",
        written: "2023-10-25 18:49:02",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "651285ae87ae5ff2d0d16e13",
                payer: "650c251a911cc0132256925b",
                quant: "$500",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "6087bbad-8ec1-4962-983b-0d0a1f302a2b",
        written: "2023-10-25 18:46:16",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "651285ae87ae5ff2d0d16e13",
                payer: "650c2519911cc01322569258",
                quant: "$100",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "0a5cb858-4342-47b4-a00e-f4faac265bda",
        written: "2023-10-25 18:45:45",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c2519911cc01322569258",
                payer: "651285ae87ae5ff2d0d16e13",
                quant: "$200",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    }
]


async function getMember({ id, accountName }) { // Get a single member, selected by either id or name
    //Now from array, later from Credit Coop backend
    //console.log(accountName)
    try {
        const db = await MongoClient.connect(DB_URL) //Connect to the mongoDB
        const dbo = db.db(DB_FOLDER)    // state the correct folder in the DB
        var user = await dbo.collection("users").findOne({ "profile.accountName": accountName }) //Get the data from the mongoDB based on the collection name and the query in findOne/find
        if (CC_NODE_ENABLED) {
            var response
            await fetch(CC_NODE_URL + '/account/summary', {
                method: "GET",
                headers: {
                    'cc-user': user._id, //Should be the ID of the admin, not the first id of the list
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => response = data)
        }
        var userData = user.profile //For users, unecessary information such as Password is not to be sent back to the frontend
        userData.is_admin = user.is_admin
        userData.email = user.email
        userData.id = user._id
        userData.status = user.is_active ? "Active" : "Inactive"
        //userData.balance = response.data[userData.id].completed.balance
        //console.log(userData.balance)
        db.close()
    }
    catch (error) {
        console.error("Failure getting " + accountName + "'s profile " + error)
    }
    return userData

}

async function getAllMembers() { // Get a list of all the members
    try {
        var allMembers = []
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var users = await dbo.collection("users").find({}).toArray()
        var response
        await fetch(CC_NODE_URL + '/account/summary', {
            method: "GET",
            headers: {
                'cc-user': users[0]._id, //Should be the ID of the admin, not the first id of the list
                'cc-auth': '123'
            },
            credentials: 'include'
        }).then(r => r.json())
            .then(data => response = data)
        for (const user of users) {
            //console.log(user.profile.accountName + " "+user._id.getTimestamp())
            let userData = user.profile
            userData.is_admin = user.is_admin
            userData.email = user.email
            userData.id = user._id
            userData.status = user.is_active ? "Active" : "Inactive"
            if (response.data[userData.id] != null) { //If the user has not performed any CC-node actions yet, its ID wont be in account summary
                userData.balance = response.data[userData.id].completed.balance
            }
            allMembers.push(userData)
        }
        db.close()
    } catch (error) {
        console.error("Error when fetching all the members data" + error)
        throw error
    }
    //console.log(allMembers)
    return allMembers
    //return members
}

async function getUserArticles(username) { // Get all article data related to a user
    //console.log(username)
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)//Simple query returning all posts that the user has uploaded
        let articles = await dbo.collection("posts").find({ "userUploader": username.accountName }).toArray()
        //console.log(articles)
        db.close()
        return articles
    } catch (error) {
        console.error("Failed to get user articles " + error)
    }
}

async function getAllArticles() { // Get all posts
    const db = await MongoClient.connect(DB_URL)
    const dbo = db.db(DB_FOLDER)
    let articles = await dbo.collection("posts").find({}).toArray()
    db.close()
    return articles

}

async function getUserCount() { // Get how many users that are not admins are in the database
    const db = await MongoClient.connect(DB_URL)
    const dbo = db.db(DB_FOLDER)
    let count = await dbo.collection("users").countDocuments({ "is_admin": false })
    db.close()
    return count
}

// getOffers calling CCbackend/articles with user as input
// Get offers related to a specific user from the CC-backend

//getTransactions - calling backend or better to call the node directly?
// Get transactions related to a specific user from the CC-node
/* Sends transactions as
date
state
payer
payee
quantity
*/
async function getAllTransactions() {
    try {
        var namedTransactions = []
        var transactions = allTransactions//Dummy data incase CC-node is disabled
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var users = await dbo.collection("users").find({}).toArray()

        if (CC_NODE_ENABLED) { //If cc-node is enabled, get transactions
            await fetch(CC_NODE_URL + '/transactions', {
                method: "GET",
                headers: {
                    'cc-user': users[0]._id, //Should be the ID of the admin, not the first id of the list
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => transactions = data)
            transactions = transactions.data
        }

        for (const transaction of transactions) {
            //console.log(user.profile.accountName + " "+user._id.getTimestamp())
            var transactionData = transaction
            transactionData.date = transaction.written
            transactionData.entries[0].quantity = transaction.entries[0].quant
            transactionData.entries[0].payee = users.find(function (user) {
                return user._id == transactionData.entries[0].payee
            }).profile.accountName

            transactionData.entries[0].payer = users.find(function (user) {
                return user._id == transactionData.entries[0].payer
            }).profile.accountName

            console.log(transactionData)
            //Get balance information from CC-node using ID from user._id
            //As well as necessary logic for this.
            namedTransactions.push(transactionData)

        }
        db.close()

    } catch (error) {
        console.error("Failed to get all transactions " + error)
    }
    return namedTransactions
}
async function getUserTransactions({ id }) {
    //let allTransaction = JSON.parse(transactions)
    //console.log("id sent:" + id)
    var transactions = allTransactions
    try {
        var namedTransactions = []
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var users = await dbo.collection("users").find({}).toArray()

        if (CC_NODE_ENABLED) {
            await fetch(CC_NODE_URL + '/transactions', {
                method: "GET",
                headers: {
                    'cc-user': users[0]._id, //Should be the ID of the admin, not the first id of the list
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => transactions = data)
            transactions = transactions.data
        }

        var userTransactions = transactions.filter(function (transaction) {
            // This only checks the main entry of the transaction
            // If this is used in a system where there can be multiple entries another way is needed
            return (transaction.entries[0].payee == id || transaction.entries[0].payer == id)
        })

        for (const transaction of userTransactions) {
            //console.log(user.profile.accountName + " "+user._id.getTimestamp())
            let transactionData = transaction
            transactionData.date = transaction.written
            transactionData.entries[0].quantity = transaction.entries[0].quant
            transactionData.entries[0].payee = transactionData.entries[0].payee.replace(transactionData.entries[0].payee, (pid) => {
                return users.find(function (user) {
                    return user._id == pid
                }).profile.accountName
            })
            transactionData.entries[0].payer = transactionData.entries[0].payer.replace(transactionData.entries[0].payer, (pid) => {
                return users.find(function (user) {
                    return user._id == pid
                }).profile.accountName
            })
            //Get balance information from CC-node using ID from user._id
            //As well as necessary logic for this.
            namedTransactions.push(transactionData)

        }
        db.close()


    } catch (error) {
        console.error("Error getting " + id + "'s transactions " + error)
    }
    return userTransactions
}

async function getUserNotifications({ name }) {

    const db = await MongoClient.connect(DB_URL)
    const dbo = db.db(DB_FOLDER)//Getting all notifications from the database to a specific user
    let notifications = await dbo.collection("notifications").find({ "toUser": name }).toArray()
    db.close()
    return notifications
}


async function addNewMember(input) {
    members.push(input)
}

var root = {
    member: ({ id, accountName }) => { // A query that should try to match what information the app needs about a single member
        return getMember({ id, accountName })
    },
    allMembers: () => { // A Query that returns all members
        return getAllMembers()
    },
    allUserArticles: ({ accountName }) => {
        return getUserArticles({ accountName })
    },
    allArticles: () => {
        return getAllArticles()
    },
    userCount: () => {
        return getUserCount()
    },
    allTransactions: () => {
        return getAllTransactions()
    },
    userTransactions: ({ id }) => {
        return getUserTransactions({ id })
    },
    userNotifications: ({ name }) => {

        return getUserNotifications({ name })
    }

}


module.exports = { schema, root }