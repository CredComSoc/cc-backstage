
/* When using functions from here to call GraphQL ensure that:
1. The required modules are installed for express & graphql.
2. The function from this page that you wish to call is imported, for example:
      import { getMembers } from '/pages/gqlFetch.js'
3. The call to a function from here is called with "await" before.
4. The call is within an "async" function.

If the data should be accessible as soon as the module loads, use the async function created to call a function from here in mounted, for example:
export default {
    data() {
        ......
        members:[]
    },
    methods: {
        ......
        async exampleGet(){
            this.members = await getMembers()
        }

    },
    mounted: function(){
        this.exampleGet()
    }

}


To add new functions here, make sure the query is defined in /api/graphql.js following the format at the top, then
1. create an export async function here
2. Make sure the query is defined in the http call with all the data of the query that you want to use
3. To get the actual data or array inside the response, use variable = variable.data.queryname
*/

import { getCurrentUser } from "./expressFetch"


//Functions that make it easier for front-end pages to fetch from the graphql without having to copy-paste fetch calls

//Gets all members from a member list
// import fetch from "node-fetch"
export async function getMembers() {
  var member_arr
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                             // When querying graphql without parameters, simply include the type and all data variables in it that you want to get
    body: JSON.stringify({
      query: `{ allMembers{ id,
            accountName,
            registered,
            is_admin,
            email,
            balance,
            status,
            description,
            address,
            city,
            phone,
            last_online,
            logo
          }  }` }),
    }).then(r => r.json())
      .then(data => member_arr = data)
    member_arr = member_arr.data.allMembers
    //console.log(member_arr)
    return member_arr
}

export async function getUserArticles(name) {
  var articles
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query allUserArticles($accountName: String!) {
            allUserArticles(accountName: $accountName) {
              id
              title
              longDesc
              article
              category
              status
              destination
              price
              endDate
              uploadDate
              userUploader
              userId
            }
          }`,
      variables: { accountName: name },
    }),
  }).then(r => r.json())
    .then(data => articles = data)
  articles = JSON.stringify(articles.data.allUserArticles) // Get the object inside the response.data.query that the call returns
  console.log(articles)
  return articles
}

export async function getAllArticles() {
  var articles

  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query allArticles{
            allArticles{
              id
              title
              longDesc
              article
              category
              status
              destination
              price
              endDate
              uploadDate
              userUploader
              userId
            }
          }`,
    }),
  }).then(r => r.json())
    .then(data => articles = data)
  articles = JSON.stringify(articles.data.allArticles) // Get the object inside the response.data.query that the call returns
  //console.log(articles)
  return articles
}

export async function getMember(name) {
  var member
  console.log(name)
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query member($accountName: String!) {
            member(accountName: $accountName) {
                id
                accountName
                registered
                is_admin
                email
                description
                address
                city
                phone
                billing {
                    name
                    box
                    address
                    orgNumber
                }
                last_online
                logo
            }
          }`,
      variables: { accountName: name },
    }),
  }).then(r => r.json())
    .then(data => member = data)
  //console.log(member)
  member = member.data.member // Get the object inside the response.data.query that the call returns
  //console.log(member)
  return member
}


export async function getUserCount() {
  var userCount
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ userCount }" }),
  }).then(r => r.json())
    .then(data => userCount = data)
  userCount = userCount.data.userCount
  // console.log(userCount)
  return userCount
}


export async function getUserTransactions(id) {
  var transactions
  console.log(id)
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query userTransactions($id: String!) {
          userTransactions(id: $id) {
            uuid
            date
            state
            type
            version
            entries {
              payer
              payee
              quantity
              description
              metadata {
                id
                quantity
              }
            }

          }
        }`,
      variables: { id: id },
    }),
  }).then(r => r.json())
    .then(data => transactions = data)
  transactions = transactions.data.userTransactions // Get the object inside the response.data.query that the call returns
  console.log(transactions)
  return transactions
}

export async function getAllTransactions(id) {
  var transactions
  //console.log(id)
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query allTransactions{
          allTransactions{
            uuid
            date
            state
            type
            version
            entries {
              payer
              payee
              quantity
              description
              metadata {
                id
                quantity
              }
            }

          }
        }`,
    }),
  }).then(r => r.json())
    .then(data => transactions = data)
    transactions = transactions.data.allTransactions // Get the object inside the response.data.query that the call returns
    //console.log(transactions)
  return transactions
}


export async function getUserNotifications(name) {
  try {
    var notifications = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
      body: JSON.stringify({
        query: `query userNotifications($name: String!) {
        userNotifications(name: $name) {
            _id
            date
            type
            toUser
            fromUser
            seen
            amount
            itemName
            itemCount
            limitSurplusAmount
          }
        }`,
        variables: { name: name },
      }),
    }).then(r => r.json())
      .then(data => notifications = data)

  } catch (error) {
    console.error("Error fetching notifications: ", error)
    throw error
  }

  notifications = notifications.data.userNotifications
  return notifications
}

export async function getUserMessages(name) {
  try {
    var user = await getCurrentUser()
    var messages = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
      body: JSON.stringify({
        query: `query userMessages($user: String!, $name: String!) {
        userMessages(user: $user, name: $name) {
            receiver
            sender
            message
          }
        }`,
        variables: { user: user.name, name: name },
      }),
    }).then(r => r.json())
      .then(data => messages = data)
  } catch (error) {
    console.error("Error fetching messages: ", error)
    throw error
  }
  messages = messages.data.userMessages
  return messages
}

// type EntryMeta{
//   id: String
//   quantity: Int
// }
// type Entry{
//   payer: String
//   payee: String
//   quantity: String
//   description: String
//   metadata: EntryMeta
// }
// type Transaction{
//   uuid: String
//   written: String
//   state: String
//   type: String
//   version: Int
//   entries: [Entry]
// }
