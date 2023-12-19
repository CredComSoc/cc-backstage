const { buildSchema } = require("graphql")
const { MongoClient, ObjectId } = require('mongodb')
import { CC_BACKEND_URL, DB_FOLDER, DB_URL, CC_NODE_URL, CC_NODE_ENABLED } from './config.js'
/*In the schema below, objects can be defined for GraphQL to use in queries or mutations*/
var schema = buildSchema(`

    type Billing{
        name: String
        box: String
        address: String
        orgNumber: String
    }
    type Member{
        id: String
        accountName: String
        registered: String
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
        logo: String
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
        endDate: String
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
                payee: "650c2519911cc01322569258",
                payer: "651285ae87ae5ff2d0d16e13",
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
                payee: "650c2519911cc01322569258",
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
                payee: "650c2519911cc01322569258",
                payer: "650c32356af5b95ceb1935eb",
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
        written: "2023-11-22 18:45:45",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c2519911cc01322569258",
                payer: "651285ae87ae5ff2d0d16e13",
                quant: "$65",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-11-25 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c2519911cc01322569258",
                payer: "650c2519911cc01322569259",
                quant: "$7",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-11-25 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "651285ae87ae5ff2d0d16e13",
                payer: "650c2519911cc01322569259",
                quant: "$30",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-11-28 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c2519911cc01322569259",
                payer: "650c251a911cc0132256925b",
                quant: "$200",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-12-17 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c32356af5b95ceb1935eb",
                payer: "650c32356af5b95ceb1935ec",
                quant: "$750",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-12-18 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c32356af5b95ceb1935ea",
                payer: "650c32356af5b95ceb1935eb",
                quant: "$150",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-12-19 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c32356af5b95ceb1935ec",
                payer: "6512869bf2d0b4af4c6c2514",
                quant: "$250",
                description: "",
                metadata: {
                    id: "0",
                    quantity: 1
                }
            }
        ]
    },
    {
        uuid: "633c3960-4c65-46ed-be1a-19c70aeb114f",
        written: "2023-12-19 19:00:05",
        state: "completed",
        type: "credit",
        version: 2,
        entries: [
            {
                payee: "650c32356af5b95ceb1935ec",
                payer: "65128694f2d0b4af4c6c2513",
                quant: "$50",
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
        userData.registered = user._id.getTimestamp()
        userData.logo = user.logo
        userData.is_admin = user.is_admin
        userData.email = user.email
        userData.id = user._id
        userData.status = user.is_active ? "Active" : "Inactive"
        if (CC_NODE_ENABLED && response.ok && response.data[userData.id] != null) { //If the user has not performed any CC-node actions yet, its ID wont be in account summary
            userData.balance = response.data[userData.id].completed.balance
        }
        db.close()
    }
    catch (error) {
        console.error("Query member(" + accountName + ") encountered an error: " + error)
        throw error
    }
    console.info("Query member(" + accountName + ") finished without errors")
    return userData

}

async function getAllMembers() { // Get a list of all the members
    try {
        var allMembers = []
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var users = await dbo.collection("users").find({}).toArray()
        if (CC_NODE_ENABLED) {
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
        }
        for (const user of users) {

            let userData = user.profile
            userData.registered = user._id.getTimestamp()
            userData.logo = user.logo
            userData.is_admin = user.is_admin
            userData.email = user.email
            userData.id = user._id
            userData.status = user.is_active ? "Active" : "Inactive"
            if (CC_NODE_ENABLED && response.data[userData.id] != null) { //If the user has not performed any CC-node actions yet, its ID wont be in account summary
                userData.balance = response.data[userData.id].completed.balance
            }
            allMembers.push(userData)
        }
        db.close()
    } catch (error) {
        console.error("Query allMembers encountered an error: " + error)
        throw error
    }
    console.info("Query getAllMembers finished without errors")
    return allMembers
}

async function getUserArticles(username) { // Get all article data related to a user
    console.log(username.accountName)
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)//Simple query returning all posts that the user has uploaded
        var articles = await dbo.collection("posts").find({ "userUploader": username.accountName }).toArray() // use $gte with date to only get offers that have not expired
        db.close()
    } catch (error) {
        console.error("Query userArticles encountered an error: " + error)
        throw error
    }
    console.info("Query userArticles(" + username.accountName + ") finished without errors")
    return articles
}


async function getAllArticles() { // Get all posts
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var articles = await dbo.collection("posts").find({}).toArray() // use $gte with date to only get offers that have not expired
        db.close()
    } catch (error) {
        console.error("Query allArticles encountered an error: " + error)
        throw error
    }
    console.info("Query allArticles finished without errors")
    return articles

}


async function getUserCount() { // Get how many users that are not admins are in the database
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var count = await dbo.collection("users").countDocuments({ "is_admin": false })
        db.close()
    }
    catch (error) {
        console.error("Query userCount encountered an error: " + error)
        throw error
    }
    console.info("Query userCount finished without errors")
    return count
}


async function getAllTransactions() {
    try {
        var namedTransactions = []
        var transactions = structuredClone(allTransactions)//Dummy data incase CC-node is disabled
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
            var transactionData = transaction
            transactionData.date = transaction.written
            transactionData.entries[0].quantity = transaction.entries[0].quant
            transactionData.entries[0].payee = users.find(function (user) {
                return user._id == transactionData.entries[0].payee
            }).profile.accountName

            transactionData.entries[0].payer = users.find(function (user) {
                return user._id == transactionData.entries[0].payer
            }).profile.accountName


            //Get balance information from CC-node using ID from user._id
            //As well as necessary logic for this.
            namedTransactions.push(transactionData)

        }
        db.close()

    } catch (error) {
        console.error("Query allTransactions encountered an error: " + error)
        throw error
    }
    console.info("Query allTransactions finished without errors")
    return namedTransactions
}


async function getUserTransactions({ id }) {
    var transactions = structuredClone(allTransactions)
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
            namedTransactions.push(transactionData)
        }
        db.close()


    } catch (error) {
        console.error("Query userTransactions(" + id + ") encountered an error: " + error)
        throw error
    }
    console.info("Query userTransactions(" + id + ") finished without errors")
    return userTransactions
}


async function getUserNotifications({ name }) {
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)//Getting all notifications from the database to a specific user
        var notifications = await dbo.collection("notifications").find({ "toUser": name }).toArray()
        db.close()
    } catch (error) {
        console.error("Query userNotifications(" + name + ") encountered an error: " + error)
        throw error
    }
    console.info("Query userNotifications(" + name + ") finished without errors")
    return notifications
}


var root = { //This is where what each query does is defined. When a query is sent with any of the names below, the corresponding function is called.
    member: ({ id, accountName }) => {
        return getMember({ id, accountName })
    },
    allMembers: () => {
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