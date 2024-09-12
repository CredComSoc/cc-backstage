<template>
  <div class="main">
    <v-menu v-model="dropdownVisible" :offset-x="menuOffsetX" :offset-y="menuOffsetY">
      <template v-slot:activator="{ on }">
        <button v-on="on" class="buttonStyle">
          <img class="icon" :src="bellIcon" alt="Members">
          <div class="counter">{{ bellCounter }}</div>
        </button>
      </template>
      <v-list v-if="!loading" class="notification" v-for="notification in unseenNotifications" :key="notification._id">
        <v-list-item @click="handleMenuItemClick(notification)">{{ notification.fromUser }}: {{ notification.type }} </v-list-item>
      </v-list>
        <!-- <v-list>
          <v-list-item @click="handleMenuItemClick('Notice 1')"> Notice 1</v-list-item>
          <v-list-item @click="handleMenuItemClick('Notice 2')"> Notice 2</v-list-item>
        </v-list> -->
    </v-menu>
  </div>
</template>
  
<script>
import bellIcon from "./component_icons/bell.png";
import { getUserNotifications } from '../pages/gqlFetch.js';
import { getCurrentUser } from '../pages/expressFetch.js';
export default {
  data() {
    return {
      bellIcon,
      bellCounter: 0,
      loading: false,
      menuOffsetX: false,
      menuOffsetY: true,
      dropdownVisible: false,
      unseenNotifications: []
    };
  },
  methods: {
    handleMenuItemClick(notice) {
      
    },
    async fetchNotifications() {
      this.loading = true
      var user = await getCurrentUser()
      var notifications = await getUserNotifications('testuser')
      this.unseenNotifications = notifications.filter(notification => notification.seen === false)
      console.log("My notifications: ", this.unseenNotifications)
      this.bellCounter = this.unseenNotifications.length
      this.loading = false
    }
  },
  async created() {
    await this.fetchNotifications()
  }
}
</script>
  
  <style scoped>
  .main 
  {
    width: 2.6rem;
    height: 2.6rem;
  }
  
  .buttonStyle {
    display: flex;
    border: none;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease;
  }
  
  .counter
  {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 65%;
    height: 65%;
    background-color: #ffc000;
    border: 1px;
    border-style: solid;
    border-radius: 50%;
    font-size: 80%;
    position: absolute; /* Position absolutely */
    top: -6px; /* Adjust this value for vertical positioning */
    right: -6px; /* Adjust this value for horizontal positioning */
    padding: 4px 6px; /* Padding for the counter */
  }

.buttonStyle:hover { 
 
    transform: scale(1.05); 
}
  </style>
  