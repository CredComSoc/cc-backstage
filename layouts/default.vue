<template>
  <v-app dark class="default_background">
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> <!-- Top toolbar code below-->



      <!-- <v-toolbar-title v-text="title" /> -->
      <v-row align="center" justify="center">
        <v-col cols="2">
          <img :src="svenskBarter" style="width:200px">
        </v-col>
      </v-row>


    </v-app-bar> <!-- Top toolbar code above-->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { space } from 'postcss/lib/list';
import svenskBarter from './svensk_barter.png';

export default {
  data() {
    return {
      svenskBarter,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Admin Panel',
          to: '/admin/admin_panel'
        }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Home',
    };
  },
  components: { space }
}
</script>




<style scoped>
.default_background {
  background-color: rgba(199, 199, 199, 0.819);
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
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 405px);
  overflow-x: hidden;
  overflow-y: auto;
}

.top-border {
  border-top: 1px solid #ffffff;
}

.row-text {
  flex-basis: 16%;
  margin: auto;
}
</style>
