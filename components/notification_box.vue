<!--
    A component to read and display a logged-in admin's notfications.
-->

<template>
    <div>
        <div class="notification-box fixed-box">
            <v-row class="notification" v-for="notification in notifications" :key="notification._id">
                <v-col cols="6">
                    <div class="timestamp">{{ notification.date }}</div>
                    <div class="larger-font">{{ notification.amount }}</div>
                </v-col>
                <v-col cols="6" class="align-right row-text">
                    {{ notification.fromUser }}<br>
                    {{ notification.type }}<br>
                    {{ notification.toUser }}
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
            notifications: [ // Dummy data
                { date: "2023-09-12", fromUser: "Anna Karlsson", toUser: "Patrik Olsson", type: "Pending", amount: "50" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Patrik Olsson", type: "Paid", amount: "100" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Kurt Bertilsson", type: "Paid", amount: "540" },
                { date: "2023-09-12", fromUser: "Anna Karlsson", toUser: "Patrik Olsson", type: "Pending", amount: "50" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Patrik Olsson", type: "Paid", amount: "100" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Kurt Bertilsson", type: "Paid", amount: "540" },
                { date: "2023-09-12", fromUser: "Anna Karlsson", toUser: "Patrik Olsson", type: "Pending", amount: "50" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Patrik Olsson", type: "Paid", amount: "100" },
                { date: "2023-09-12", fromUser: "Alfred Skog", toUser: "Kurt Bertilsson", type: "Paid", amount: "540" },
            ],

        }
    },

    methods: {
        async updateNotifications() {
            const currentUser = await getCurrentUser()
            this.notifications = await getUserNotifications(currentUser.name)
            if (this.notifications == null) {
                this.notifications = []
                var noNotifications = { date: "", fromUser: "", toUser: "", type: "", amount: "No notifications" }
                this.notifications.push(noNotifications)
            }
        }
    },

    mounted() {
        this.updateNotifications()
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
