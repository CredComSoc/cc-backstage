
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
        },
        body: JSON.stringify({ query: "{ allMembers{ id, name, balance, status, phone, email}  }" }),
    }).then(r => r.json())
        .then(data => member_arr = data)
    member_arr = member_arr.data.allMembers
    return member_arr
}
