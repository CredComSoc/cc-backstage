
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
        body: JSON.stringify({ query: "{ allMembers{ id, accountName, is_admin, email, description, address, city, phone, last_online}  }" }),
    }).then(r => r.json())
      .then(data => member_arr = data)
    member_arr = member_arr.data.allMembers
    console.log(member_arr)
    return member_arr
}

export async function getUserArticles(name){
    var articles
    console.log(name)
    await fetch("/api/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },                           //When querying GraphQL with one or more parameters, the format below is needed in the query string as well as the "variables" field with whatever parameters are to be sent
        body: JSON.stringify({ query: `query allUserArticles($accountName: String!) {
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
          variables: { accountName: name }, }),
    }).then(r => r.json())
      .then(data => articles = data)
      articles = JSON.stringify(articles.data.allUserArticles) // Remove the Json "padding" to get the object or array
      console.log(articles)
    return articles
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
    console.log(userCount)
    return userCount
}

