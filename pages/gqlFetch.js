
//Functions that make it easier for front-end pages to fetch from the graphql without having to copy-paste fetch calls

//Gets members from a member list and returns them without the unnecessary labels
export async function getMembers(){
    var member_arr
    await fetch("/api/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
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
        },
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
      articles = JSON.stringify(articles.data.allUserArticles)
      console.log(articles)
    return articles
}