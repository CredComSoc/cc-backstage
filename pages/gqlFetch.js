
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
*/


//Functions that make it easier for front-end pages to fetch from the graphql without having to copy-paste fetch calls

//Gets members from a member list and returns them without the unnecessary labels
export async function getMembers() {
  var member_arr
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                             // When querying graphql without parameters, simply include the type and all members in it that you want to recieve
    body: JSON.stringify({
      query: `{ allMembers{ id,
            accountName,
            is_admin,
            email,
            balance,
            status,
            description,
            address,
            city,
            phone,
            last_online
          }  }` }),
  }).then(r => r.json())
    .then(data => member_arr = data)
  member_arr = member_arr.data.allMembers
  console.log(member_arr)
  return member_arr
}

export async function getUserArticles(name) {
  var articles
  console.log(name)
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
              uploadDate
              userUploader
              userId
            }
          }`,
      variables: { accountName: name },
    }),
  }).then(r => r.json())
    .then(data => articles = data)
  articles = JSON.stringify(articles.data.allUserArticles) // Remove the Json "padding" to get the object or array
  //console.log(articles)
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
              uploadDate
              userUploader
              userId
            }
          }`,
    }),
  }).then(r => r.json())
    .then(data => articles = data)
  articles = JSON.stringify(articles.data.allArticles) // Remove the Json "padding" to get the object or array
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
            }
          }`,
      variables: { accountName: name },
    }),
  }).then(r => r.json())
    .then(data => member = data)
  //console.log(member)
  member = JSON.stringify(member.data.member) // Remove the Json "padding" to get the object or array
  //console.log(member)
  return member
}

export async function getMemberById(id) {
  var member
  //console.log(name)
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
    body: JSON.stringify({
      query: `query member($id: String!) {
            member(id: $id) {
                id
                accountName
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
            }
          }`,
      variables: { id: id },
    }),
  }).then(r => r.json())
    .then(data => member = data)
  console.log(member)
  member = JSON.stringify(member.data.member) // Remove the Json "padding" to get the object or array
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
            written
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
  // transactions = JSON.stringify(transactions.data.userTransactions) // Remove the Json "padding" to get the object or array
  transactions = transactions.data.userTransactions
  console.log(transactions)
  return transactions

}

export async function getAllTransactions(id) {
  var transactions
  console.log(id)
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
            written
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
  transactions = JSON.stringify(transactions.data.allTransactions) // Remove the Json "padding" to get the object or array
  console.log(transactions)
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
    return
  }
  notifications = JSON.stringify(notifications.data.userNotifications) // Remove the Json "padding" to get the object or array

  return notifications


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
