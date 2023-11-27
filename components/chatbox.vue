<template>
    <div>
        <div class="chatbox fixed-box">
            <v-row class="message-row" v-for="message in messages.slice().reverse()">
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
            <v-col cols="12">
                <input type="text" class="message-input" />
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {

    data() {
        return {

            messages: [
                { date: "2023-09-12", time: "12:03", from: "Anna Karlsson", message: "Hej Hej Hej Hej Hej Hej Hej Hej ", from_me: true },
                { date: "2023-09-12", time: "12:04", from: "Patrik Olsson", message: "Hejsan", from_me: false },
                { date: "2020-01-10", time: "12:05", from: "Anna Karlsson", message: "Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då Hej då hej då ", from_me: true },
                { date: "2023-09-12", time: "12:06", from: "Patrik Olsson", message: "Hejsan", from_me: false },
                { date: "2023-09-12", time: "12:07", from: "Anna Karlsson", message: "Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej Hej ", from_me: true }
            ],

        }
    },

}
</script>

<style>

.chatbox {
  height: calc(100vh - 342px);
  color: white;
  flex-direction: column;
  align-self: flex-end;
  display: flex;
  overflow-y: auto;
}
.message-row {
    margin: 0px;
}

.message {
    border-radius: 10px;
    margin: 6px;
}

.right-message {
    background-color: #00abe0;
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
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}
</style>