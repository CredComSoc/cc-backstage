
//Functions that make it easier for front-end pages to fetch from the graphql without having to copy-paste fetch calls

//Gets members from a member list and returns them without the unnecessary labels
export async function getMembers() {
    var member_arr
    await fetch("/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query: "{ allMembers{ id, name, balance, status, phone, email}  }" }),
    }).then(r => r.json())
        .then(data => member_arr = data)
    member_arr = member_arr.data.allMembers
    return member_arr
}
