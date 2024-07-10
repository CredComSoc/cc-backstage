const { MongoClient, ObjectId } = require('mongodb');
import { DB_URL, DB_FOLDER } from './config.js'
// const config = require('./config');
const uuid = require('uuid');
const { query } = require('express');
const { model } = require('mongoose');

const mongoURL = DB_URL;


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
            // console.log("Res == ", res[chatID])
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


async function getAllChatIDs(user) {
    console.log("getAllChatIDs called...")
    try {
        const db = await MongoClient.connect(mongoURL);
        const dbo = db.db(DB_FOLDER);

        const res = await dbo.collection('users').findOne({ 'profile.accountName': user });

        if (res && res.chats) {
            return res.chats; // Return chat IDs directly
        } else {
            return false; // User not found or no chats exist
        }
    } catch (err) {
        console.error(err);
        return false; // Handle errors by returning false
    }
//   } finally {
//     await db.close();
//   }
}


async function getAllChatHistories(user) {
  try {
    const chatIDs = await getAllChatIDs(user); // Call the function to get chat IDs

    if (chatIDs === false) {
      console.error("Chat IDs not found");
      return false; // Early return if no chat IDs found
    }
      // return chatIDs;
    const chatEntries = Object.entries(chatIDs); // Convert object to array of key-value pairs

    // Since chatIDs is an array, use Promise.all to fetch chat histories concurrently
    const chatHistories = await Promise.all(
      chatEntries.map(async ([chatID, username]) => {
        // Fetch chat history for each chat ID
        const history = await getChatHistory(chatID); // Assuming getChatHistory is async
        return {
            chatID: chatID,
            chatter: username,
            chatMessages: history
        };
          
      })
    );

    console.log("Chat Histories: ", chatHistories)
    return chatHistories; // Return the array of retrieved chat histories
  } catch (err) {
    console.error(err);
    return false; // Handle errors by returning false
  }
}


// const getAllChatHistories = async (user) => {
//     return new Promise( async (resolve, reject) => {
//         const chatIDs = await this.getAllChatIDs(user);
//         if (chatIDs === false) {
//             console.error("Chat IDs not found");
//             resolve(false);
//         }
//         else {
//             resolve(chatIDs);
//         }
//     });
// }

async function storeChatMsg(chatID, msg) {
  try {
    const db = await MongoClient.connect(mongoURL);
    const dbo = db.db();

    // Update chat with the message
    await dbo.collection('chats').updateOne(
      { [chatID]: { $exists: true } },
      { $push: { [chatID]: msg } }
    );

    db.close(); // Close the database connection
  } catch (err) {
    console.error(err);
  }
}

// const storeChatMsg = async (chatID, msg) => {
//     const db = await MongoClient.connect(mongoURL);
//     const dbo = db.db();
//     dbo.collection('chats').updateOne({[chatID]: {$exists: true}}, { $push: { [chatID]: msg } }, (err, res) => {
//         if (err) {
//             console.error(err);
//             db.close();
//         } else if (res) {
//             db.close();
//         } else {
//             db.close();
//         }
//     });
// }


async function storeNotification(notification) {
  try {
    const db = await MongoClient.connect(mongoURL);
    const dbo = db.db(DB_FOLDER);

    // Find the user who receives the notification
    const user = await dbo.collection('users').findOne({ 'profile.accountName': notification.toUser });

    if (user) {
      let notificationList = user.notifications || []; // Initialize if notifications is undefined

      // Check for existing notification and update list
      const existingIndex = notificationList.findIndex(
        (item) => item.fromUser === notification.fromUser && item.type === notification.type
      );
      if (existingIndex !== -1) {
        notificationList.splice(existingIndex, 1); // Remove existing notification
      }

      // Limit notification list length (first-in, first-out)
      notificationList = notificationList.slice(-3).concat(notification); // Keep the last 3 + new one

      // Update user document with the updated notification list
      await dbo.collection('users').updateOne(
        { 'profile.accountName': notification.toUser },
        { $set: { notifications: notificationList } }
      );

      console.log("ADDED NOTIFICATION");
    }

    db.close();
  } catch (err) {
    console.error(err);
  }
}

// const storeNotification = async (notification) => {
//     const db = await MongoClient.connect(mongoURL)
//     const dbo = db.db();
   
//     dbo.collection('users').findOne({ 'profile.accountName': notification.toUser }, (err, user) => {
//         if (err) {
//             console.error(err);
//             db.close();
//         }  
//         else if (user) {
//           let notification_list = user.notifications
//           for (let i = 0; i < notification_list.length; i++) {
//             if (notification_list[i].fromUser === notification.fromUser && notification_list[i].type === notification.type) {
//               notification_list.splice(i, 1);
//               console.log(notification_list);
//               break
//             }
//           }
//           if (notification_list.length >= 4) {
//             notification_list = [notification, notification_list[0], notification_list[1], notification_list[2]]
//           } else {
//             notification_list.push(notification)
//           }
//           dbo.collection('users').updateOne({ 'profile.accountName': notification.toUser }, { $set: { notifications: notification_list } }, (err, query) => {
//             if (err) {
//                 console.error(err);
//                 db.close();
//             }
//             else if (query.acknowledged) {
//                 console.log("ADDED NOTIFICATION")
//                 db.close();
//             } else {
//                 db.close();
//             }
//           });
//         } else {
//             db.close();
//         }
//     });
// }


async function markNotification(chatID, username) {
  try {
    const db = await MongoClient.connect(mongoURL);
    const dbo = db.db(DB_FOLDER);

    // Find the user who received the notification
    const user = await dbo.collection('users').findOne({ 'profile.accountName': username });

    if (user) {
      let notificationList = user.notifications || []; // Initialize if notifications is undefined
      let foundNotice = false;

      for (let i = 0; i < notificationList.length; i++) {
        if (notificationList[i].chatID === chatID && notificationList[i].type === "chatMessage") {
          notificationList[i].seen = true;
          foundNotice = true;
          break;
        }
      }

      if (foundNotice) {
        // Update user document with the marked notification
        await dbo.collection('users').updateOne(
          { 'profile.accountName': username },
          { $set: { notifications: notificationList } }
        );
        console.log("MARKED NOTIFICATION");
      }
    }

    db.close();
  } catch (err) {
    console.error(err);
  }
}

// const markNotification = async (chatID, username) => {
//     const db = await MongoClient.connect(mongoURL)
//     const dbo = db.db();
   
//     dbo.collection('users').findOne({ 'profile.accountName': username }, (err, user) => {
//         if (err) {
//             console.error(err);
//             db.close();
//         }
//         else if (user) {
//             let found_notice = false;
//             let notification_list = user.notifications
//             for (let i = 0; i < notification_list.length; i++) {
//                 if (notification_list[i].chatID === chatID && notification_list[i].type === "chatMessage" ) {
//                     notification_list[i].seen = true;
//                     found_notice = true;
//                     break
//                 }
//             }
//             if (found_notice) {
//                 dbo.collection('users').updateOne({ 'profile.accountName': username }, { $set: { notifications: notification_list } }, (err, query) => {
//                     if (err) {
//                         console.error(err);
//                         db.close();
//                     }
//                     else if (query.acknowledged) {
//                         console.log("MARKED NOTIFICATION")
//                         db.close();
//                     } else {
//                         db.close();
//                     }
//                 });
//             } else {
//                 db.close();
//             }
//         }
//         else {
//             db.close();
//         }
//     });
// }

export { initChat, deleteChat, createChat, chatExists, getAllChatIDs, getAllChatHistories, getChatHistory, getChatID, checkChatStatus, storeChatMsg, storeNotification, markNotification }