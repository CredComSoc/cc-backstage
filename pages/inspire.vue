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
    }

  }
}
</script>