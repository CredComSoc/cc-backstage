<template>
    <v-app dark class="default_background">
      <v-app-bar fixed app >
        <v-col></v-col>
        <v-col></v-col>
        <v-col align="right"></v-col>
        <v-col align="left"><members></members></v-col>
        <v-col align="center">
          <button @click="homeRoute()">
            <img :src="svenskBarter" style="width:200px" alt="SvenskBarter" draggable="false">
          </button>
        </v-col>
        <v-col></v-col>
        <v-col><notice></notice></v-col>
        <v-col></v-col>
        <v-col align="right"> <help></help> </v-col>
      </v-app-bar>        
     
    <!-- Top toolbar code above-->
     
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
  
  <script>
import svenskBarter from './svensk_barter.png';
import members from '/components/topbar_members.vue';
import help from '/components/topbar_help.vue';
import notice from '/components/topbar_notice.vue';

  export default {
    data() {
        return {
            svenskBarter,
            fixed: false,
        };
    },

    methods:
    {
      homeRoute()
      {
        this.$router.push('/admin/admin_overview');
      }

    },

    components: 
    {
      help: help,
      members: members, 
      notice: notice,
    }
}
  </script>
<style scoped>

.default_background
{
  background-color: rgba(199, 199, 199, 0.819);
}
</style>