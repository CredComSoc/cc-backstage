<template>
    <v-row>
      <v-col class="text-left">
        <button @click="gqlSimple">Single string graphql query</button>
        </br>
        <div>Username: {{this.username}}</div>
      </v-col>

      <v-col class="text-middle">
      <button @click="gqlObject">Object with multiple fields query</button>
      </v-col>

      <v-col class="text-right">
      <button @click="gqlMultiple">Object and single string query</button>
      </v-col>

    </v-row>
  </template>


  <script>
export default {
    data(){
        return {
            username: "Loading..", // Variable used in the first column for username
            user:{}


    }
    },
  methods: {
    async gqlSimple(){ // Get the "username" from graphql
        const res = await fetch("/api/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ username }" }),
      })
      .then(r => r.json())
      .then(data => {this.username = data
    }) //Assigning the response recieved to variable



    },
    async gqlObject(){

    },
    async gqlMultiple(){
      fetch("/api/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ user {username, balance}, username }" }),
      })
      .then(r => r.json())
      .then(data => console.log("data returned:", data))
    }

  }
}
</script>