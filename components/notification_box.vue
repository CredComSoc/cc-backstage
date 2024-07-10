<!--
    A component to read and display a logged-in admin's notfications.
-->

<template>
    <div>
        <div class="notification-box fixed-box">
            <v-row v-if="loading">
                <v-col>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
            </v-row>
            <v-row v-if="!loading" class="notification" v-for="notification in notifications" :key="notification._id">
                <v-col cols="6">
                    <div class="timestamp">{{ notification.date }}</div>
                    <div class="larger-font">{{ notification.amount }}</div>
                </v-col>
                <v-col cols="6" class="align-right row-text">
                    {{ notification.fromUser }}<br>
                    {{ notification.type }}<br>
                    <!-- {{ notification.toUser }} -->
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { getUserNotifications } from '/pages/gqlFetch.js'
import { getCurrentUser } from '/pages/expressFetch.js'

export default {

    data() {
        return {
            notifications: [],
            loading: false
        }
    },

    methods: {
        async updateNotifications() {
            this.loading = true
            const currentUser = await getCurrentUser()
            // this.notifications = await getUserNotifications(currentUser.name)
            this.notifications = await getUserNotifications('testuser')
            if (this.notifications.length === 0) {
                this.notifications = []
                var noNotifications = { date: "", fromUser: "", toUser: "", type: "No notification", amount: '0' }
                this.notifications.push(noNotifications)
            }
            this.loading = false
        }
    },

    async mounted() {
        await this.updateNotifications()
    }

}
</script>

<style scoped>
.notification-box {
    height: calc(100vh - 293px);
    color: black;
}

.notification {
    border-radius: 10px;
    margin: 10px;
    background-color: #f9f9f9;
}

.timestamp {
    font-size: small;
}

.align-right {
    text-align: right;
}

.larger-font {
    font-size: larger;
}
</style>
