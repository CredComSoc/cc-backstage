<template>
    <v-row>
      <v-col class="text-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        <blockquote class="blockquote">
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
        <div></div>
        <button @click="showMessageFromBackend">Show message from backend</button>
        <button @click="getMember">Show member data</button>
        <button @click="getGraphql">Show query</button>

      </v-col>
    </v-row>
  </template>


<script>
export default {
  methods: {
    async showMessageFromBackend(){
      try{
        const response = await this.$axios.get('/api/test')
        console.log(response.data)
      }catch (err){
        console.log(err)
      }
      console.log(this.$axios)
    },
    async getMember(){
      try{
        const response = await this.$axios.get('/api/example')
        console.log(response.data)
      }catch (err){
        console.log(err)
      }
    },
    async getGraphql(){
      fetch("/api/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ user {username}, username }" }),
      })
      .then(r => r.json())
      .then(data => console.log("data returned:", data))
    }

  }
}
</script>