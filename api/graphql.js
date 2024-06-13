const { buildSchema } = require("graphql")
const { MongoClient, ObjectId } = require('mongodb')
import { CC_BACKEND_URL, DB_FOLDER, DB_URL, CC_NODE_URL, CC_NODE_ENABLED } from './config.js'
// import { getChatHistory } from './chatFunctions.js'
const uuid = require('uuid');
const { query } = require('express');
const { model } = require('mongoose');

/*
To define new objects to use in graphql, define in the var schema below
To add queries to retrieve data using mongodb, add to the query type in the schema, define name of the query and what object should be returned, then
1. Add the query to the resolver "var root". If a parameter is needed, send it as an object {parameter}
2. To make things easier, create an async function to be called from the resolver, which receives the potential parameter
3. When getting data from the mongoDB or CC-node, use await
Then, to use the query from the frontend, define it in /pages/gqlFetch.js, then call that function using await
*/
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
    type Messages{
        message: String
        messageType: String
        filename: String
        sender: String
        receiver: String
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
        userMessages(user: String!, name: String!): [Messages]
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

/*Here the functions called from the resolver are called.
This first one is thoroughly documented to show how they work, they all work very similiarly*/

async function getMember({ id, accountName }) { // Get a single member, selected by name
    try {
        const db = await MongoClient.connect(DB_URL) //Connect to the mongoDB. Address & login defined in config.js
        const dbo = db.db(DB_FOLDER)    // state the correct folder in the DB
        var user = await dbo.collection("users").findOne({ "profile.accountName": accountName }) //Get the data from the mongoDB based on the collection name and the query in findOne/find. Find returns all matching results while findOne returns the first match

        if (CC_NODE_ENABLED) { //If CC-node is enabled (its address and whether its enabled or not is defined in config.js), get all account information such as balance
            var response
            await fetch(CC_NODE_URL + '/account/summary', {
                method: "GET",
                headers: {
                    'cc-user': user._id,
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => response = data)
        }
        var userData = user.profile //For users, unecessary information such as Password is not to be sent back to the frontend
        userData.registered = user._id.getTimestamp() //Timestamp of when the account was created is coded inside the ID, this translates it to a date object
        userData.logo = user.logo //Logo is the filename of the profile picture the user has.
        userData.is_admin = user.is_admin //Bool whether the user is an admin or not.
        userData.email = user.email
        userData.id = user._id
        userData.status = user.is_active ? "Active" : "Inactive" //This translates a bool whether the account is active or suspended and assigns a string which is clearer to use in the frontend.
        if (CC_NODE_ENABLED && response.ok && response.data[userData.id] != null) { //If the user has not performed any CC-node actions yet, its ID wont be in account summary?
            userData.balance = response.data[userData.id].completed.balance
        }
        db.close() //Close the current connection to the database after the data has been retrieved
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
                    'cc-user': users[0]._id, //Should ideally be the ID of the admin using the app rather than the first id of the list?
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => response = data)
        }
        for (const user of users) { //Looping through all users to perform the same assignments as in getMember

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
    //console.log(username.accountName)
    try {
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)//Simple query returning all posts that the user has uploaded
        var articles = await dbo.collection("posts").find({ "userUploader": username.accountName }).toArray()
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
        var articles = await dbo.collection("posts").find({}).toArray()
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
        var transactions = allTransactions//Dummy data incase CC-node is disabled. If this is not removed, in order to use transaction dummy data it has to be deepcopied in these functions or the logic will break when trying to replace ID with username
        const db = await MongoClient.connect(DB_URL)
        const dbo = db.db(DB_FOLDER)
        var users = await dbo.collection("users").find({}).toArray()

        if (CC_NODE_ENABLED) { //If cc-node is enabled, get transactions
            await fetch(CC_NODE_URL + '/transactions', {
                method: "GET",
                headers: {
                    'cc-user': users[0]._id,
                    'cc-auth': '123'
                },
                credentials: 'include'
            }).then(r => r.json())
                .then(data => transactions = data)
            transactions = transactions.data
        }

        for (const transaction of transactions) { // For loop to get the date and to translate the IDs that the CC-node sends back into usernames
            //Currently as this system appears to only use transactions with one entry, the first entry is translated. If this is used in a system with multiple entries per transaction, it would have to be changed.
            var transactionData = transaction
            transactionData.date = transaction.written
            transactionData.entries[0].quantity = transaction.entries[0].quant
            transactionData.entries[0].payee = users.find(function (user) {
                return user._id == transactionData.entries[0].payee
            }).profile.accountName

            transactionData.entries[0].payer = users.find(function (user) {
                return user._id == transactionData.entries[0].payer
            }).profile.accountName

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
                    'cc-user': users[0]._id,
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
    console.log(notifications)
    return notifications
}

async function deleteChat(user, chatter, chatID) {
    console.log("deleteChat called...")
    const db = await MongoClient.connect(DB_URL);
    const dbo = db.db(DB_FOLDER);
    const key = 'chats.' + chatID;
    dbo.collection('users').updateOne({'profile.accountName': user}, { $unset: { [key]: 1 } }, (err, res) => {
        if (err) {
            console.error(err);
            db.close(); 
        }
        else {
            db.close();
        }
    }); 
}

async function createChat(user, chatter, chatID) {
  console.log("createChat called...");

    try {
        const db = await MongoClient.connect(DB_URL);
        const dbo = db.db(DB_FOLDER);
        const key = 'chats.' + chatID;

        // Update user document with the chat information
        const updateResult = await dbo.collection('users').updateOne(
            { 'profile.accountName': user },
            { $set: { [key]: chatter } }
        );

        // Check update result for success
        if (updateResult.matchedCount > 0) {
            db.close();
            return true; // Chat successfully created for the user
        } else {
            db.close();
            return false; // User not found or update failed
        }
    } catch (err) {
        console.error(err);
        return false; // Handle errors by returning false
    }
}

async function initChat(sender, receiver) {
  console.log("initChat called...");

  try {
    // Generate chat ID
    const chatID = uuid.v4();

    // Create chat documents for both users
    const createSenderChat = createChat(sender, receiver, chatID);
    const createReceiverChat = createChat(receiver, sender, chatID);

    // Wait for both chat creations to finish (assuming createChat is async)
    const [res1, res2] = await Promise.all([createSenderChat, createReceiverChat]);

    if (!res1 || !res2) {
      // Failed to create chats for both users, clean up
      await deleteChat(sender, receiver, chatID);
      throw new Error("Failed to initialize chat");  // Throw an error for proper handling
    }

    // Connect to database and initialize chat history
    const db = await MongoClient.connect(DB_URL);
    const dbo = db.db(DB_FOLDER);
    await dbo.collection('chats').insertOne({ [chatID]: [] }); // Use await for insertion

    // Close the database connection
    db.close();

    // Chat initialized successfully, return chat ID
    return chatID;
  } catch (err) {
    console.error(err);
    return false; // Or potentially throw a specific error for caller handling
  }
}

async function getChatHistory(chatID) {
    console.log("getChatHistory called...");

    try {
        const db = await MongoClient.connect(DB_URL);
        const dbo = db.db(DB_FOLDER);

        const res = await dbo.collection('chats').findOne({ [chatID]: { $exists: true } });

        if (res) {
            return res[chatID]; // Return chat history if found
        } else {
            return false; // Chat not found
        }
    } catch (err) {
        console.error(err);
        return false; // Handle errors by returning false
    }
}

async function getChatID(user, chatter) {
    console.log("getChatID called...");

    try {
        const db = await MongoClient.connect(DB_URL);
        const dbo = db.db(DB_FOLDER);

        const res = await dbo.collection('users').findOne({ 'profile.accountName': user });

        if (res && res.chats) {
            for (const [key, val] of Object.entries(res.chats)) {
                if (val === chatter) {
                    return key; // Found chat ID, return it
                }
            }
            return false; // No matching chat found
        } else {
            return false; // User not found or no chats exist
        }
    } catch (err) {
        console.error(err);
        return false; // Handle errors by returning false
    }
}

async function chatExists(user, chatter) {
    console.log("chatExists called...")
    const chatExist = await checkChatStatus(user, chatter);
    console.log("chatExists: " + chatExist)
    if (!chatExist) {
        const chatID = await initChat(user, chatter);
        console.log("New chatID: " + chatID)
        return chatID;
    }
    else {
        const chatID = await getChatID(user, chatter);
        if (chatID === false) {
            console.log("ChatID not found");
            return chatID;
        }   
        else {
            console.log("ChatID found: " + chatID);
            return chatID;
        }
    }
}

async function checkChatStatus(user, chatter) {
  console.log("checkChatStatus called...");

    try {
        const db = await MongoClient.connect(DB_URL);
        const dbo = db.db(DB_FOLDER);
        const key = 'chats.' + chatter;

        const res = await dbo.collection('users').findOne({ 'profile.accountName': user });

        if (res) {
            if ('chats' in res) {
                return Object.values(res.chats).findIndex(val => val === chatter) > -1;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getUserChats({ user, name }) {
    // const { chatExists } = require('./chatFunctions.js');
    console.log("getUserChats called...")
    try {
        const chatID = await chatExists(user, name);
        if (chatID === false) {
            console.log("Query userChats(" + user + ") finished without errors and found no data")
            return []
        } else {
            // const { getChatHistory } = require('./chatFunctions.js');
            const history = await getChatHistory(chatID);
            console.log("Query userChats(" + name + ") finished without errors")
            return history
        }
    } catch (error) {
        console.log("Query userChats(" + user + ") encountered an error: " + error)
        throw error
    }
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
    },
    userMessages: ({ user, name }) => {
        return getUserChats({ user, name })
    }

}


module.exports = { schema, root }