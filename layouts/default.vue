<template>
  <v-app dark class="default_background">
    <v-app-bar fixed app>
      <v-col></v-col>
      <v-col></v-col>
      <v-col align="right">
        <members></members>
      </v-col>
      <v-col></v-col>
      <v-col align="center">
        <button @click="homeRoute()">
          <img :src="svenskBarter" style="width:200px" alt="SvenskBarter" draggable="false">
        </button>
      </v-col>
      <v-col></v-col>
      <v-col>
        <notice></notice>
      </v-col>
      <v-col></v-col>
      <v-col align="right">
        <help></help>
      </v-col>
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
    homeRoute() {
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
.default_background {
  background-color: rgb(238, 238, 238);
}


.container-toolbar {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-left: 500px;
}
</style>

<style>
.fixed-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.fixed-box-with-admin {
  height: calc(100vh - 405px);
  margin-top: 20px;
}

.fixed-box-no-admin {
  height: calc(100vh - 340px);
  margin-top: 20px;
}

.notification-box {
  height: calc(100vh - 293px);
  color: white;
  background-color: black;
}

.top-border {
  border-top: 1px solid #ffffff;
}


.row-headings {
  flex-basis: 16%;
  font-weight: bold;
  font-size: 95%;
  border-bottom: 1px solid #ffffff;
}

.row-text {
  margin: auto;
  font-size: 90%;
}

.button-row {
  text-align: right;
  flex-basis: 16%;
}

.white-button {
  background-color: #f5f5f5;
  height: 30px;
  padding: 0 5px;
  margin: 0 5px 0 0px;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}
</style>
