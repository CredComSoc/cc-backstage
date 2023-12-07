<template>
    <div>
        <div class="notification-box fixed-box">
            <v-row class="notification" v-for="notification in notifications">
                <v-col cols="6">
                    <div class="timestamp">{{ notification.date }}</div>
                    <div class="larger-font">{{ notification.sum }}</div>
                </v-col>
                <v-col cols="6" class="align-right row-text">
                    {{ notification.sender }}<br>
                    {{ notification.status }}<br>
                    {{ notification.receiver }}
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {

            notification: "",

            notifications: [
                { date: "2023-09-12", sender: "Anna Karlsson", receiver: "Patrik Olsson",  status: "Pending", sum: "50" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Patrik Olsson",  status: "Paid", sum: "100" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Kurt Bertilsson",  status: "Paid", sum: "540" },
                { date: "2023-09-12", sender: "Anna Karlsson", receiver: "Patrik Olsson",  status: "Pending", sum: "50" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Patrik Olsson",  status: "Paid", sum: "100" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Kurt Bertilsson",  status: "Paid", sum: "540" },
                { date: "2023-09-12", sender: "Anna Karlsson", receiver: "Patrik Olsson",  status: "Pending", sum: "50" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Patrik Olsson",  status: "Paid", sum: "100" },
                { date: "2023-09-12", sender: "Alfred Skog", receiver: "Kurt Bertilsson",  status: "Paid", sum: "540" },
            ],

        }
    },
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
