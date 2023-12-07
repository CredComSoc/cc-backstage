<template>
    <div>
        <div name="scrollbox" class="chatbox fixed-box">
            <v-row class="message-row" v-for="message in messages">
                <v-col v-if="message.from_me" cols="3"></v-col>
                <v-col v-if="message.from_me" cols="8" class="message right-message">
                    <div class="timestamp">{{ message.date }} {{ message.time }}</div>
                    {{ message.message }}
                </v-col>
                <v-col v-else cols="8" class="message left-message">
                    <div class="timestamp">{{ message.date }} {{ message.time }}</div>
                    {{ message.message }}
                </v-col>
            </v-row>
        </div>
        <v-row>
            <v-col cols="10" class="no-padding-right">
                <input v-on:keyup.enter="sendMessage" v-model="myMessage" type="text" class="message-input" />
            </v-col>
            <v-col cols="2" class="no-padding-left align-right">
                <div @click="sendMessage" class="white-button send-button">Send</div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {

    data() {
        return {

            myMessage: "",

            messages: [
                { date: "2023-09-12", time: "12:03", from: "Anna Karlsson", message: "Hej Hej Hej Hej Hej Hej Hej Hej ", from_me: true },
                { date: "2023-09-12", time: "12:04", from: "Patrik Olsson", message: "Hejsan", from_me: false },
                { date: "2020-01-10", time: "12:05", from: "Anna Karlsson", message: "Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då ", from_me: true },
                { date: "2023-09-12", time: "12:06", from: "Patrik Olsson", message: "Hejsan", from_me: false },
                { date: "2023-09-12", time: "12:07", from: "Anna Karlsson", message: "Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej ", from_me: true }
            ],

        }
    },

    methods: {
        scrollToBottom() {
            this.$nextTick(function () {
                var myObj = document.getElementsByName("scrollbox")[0];
                myObj.scrollTop = myObj.scrollHeight;
            })
        },

        sendMessage() {
            var fullDate = new Date();
            var dateStr = fullDate.getFullYear() + "-" + fullDate.getMonth() + "-" + fullDate.getDate();
            var timeStr = fullDate.getHours() + ":" + fullDate.getUTCMinutes();
            var mess = { date: dateStr, time: timeStr, from: "Me", message: this.myMessage, from_me: true }
            this.messages.push(mess);
            this.myMessage = "";
            this.scrollToBottom();
        }
    },

    created() {
        this.scrollToBottom();
    }



}
</script>

<style scoped>
.chatbox {
    height: calc(100vh - 342px);
    color: white;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

.message-row {
    margin-top: 0px !important;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
}

.message {
    border-radius: 10px;
    margin: 6px;
}

.right-message {
    background-color: #00abe0;
    margin-left: auto;
    margin-right: 6px;
}

.left-message {
    background-color: #ff4558;
}

.timestamp {
    font-size: small;
}

.writebox {
    background-color: white;
}

.message-input {
    width: 98%;
    height: 40px;
    background-color: white;
    padding: 10px;
    margin: 2px;
    border-radius: 10px;
}

.align-right {
    text-align: right;
}

.no-padding-right {
    padding-right: 0px;
}

.no-padding-left {
    padding-left: 0px;
}

.send-button {
    margin: 2px;
    margin-right: 6px;
    height: 40px;
}
</style>
