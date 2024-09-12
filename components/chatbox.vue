<!--
    Chat box component. Display messages, and send new messages to appear in the chat flow.
    This has no connection to the database, so messages are just dummy data, and nothing is saved.
-->

<template>
    <div>
        <div name="scrollbox" class="chatbox fixed-box">
            <v-row v-if="loading">
                <v-col>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
            </v-row>
            <v-row v-if="!loading" class="message-row" v-for="message in messages" :key="message.id">
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
import { getUserMessages, getChatHistories } from '/pages/gqlFetch.js'
import io from 'socket.io-client'
import { CHAT_URL, getCurrentUser } from '/pages/expressFetch.js'
export default {

    props: ['memberName'],

    data() {
        return {

            myMessage: "",
            messages: [],
            history: [],
            history_values: {},
            activeChat: [],
            reciever: '',
            socket: 0,
            all_chatIDs: {},
            chatters: {},
            user: '',
            chosenChat: null,
            allmembers: [],
            showMemberlist: false,
            checkedNames: [],
            chatID: '',
            loading: false
        }
    },

    methods: {
        scrollToBottom() { // Scrolls the chatbox so that the latest message (at the bottom) is visible
            this.$nextTick(function () { // Scroll needs to wait one tick, so that the new message has time to be mounted
                var myObj = document.getElementsByName("scrollbox")[0];
                myObj.scrollTop = myObj.scrollHeight;
            })
        },
        sendMessage() {
            if (this.memberName === 'all') {
                this.myMessage = 'BROADCAST! ' + this.myMessage
                let message = {
                    message: this.myMessage,
                    messagetype: 'string',
                    filename: '',
                    sender: this.user.name,
                }
                for (const [key, value] of Object.entries(this.all_chatIDs)) {
                    // console.log("Value: ", value)
                    message['id'] = key
                    message['reciever'] = this.chatters[key]
                    const chatRoom = {
                        user: this.user.name,
                        chatID: key
                    }
                    this.socket.emit('join', chatRoom)
                    this.socket.emit('message', message)
                    this.socket.emit('leave', { chatID: key })
                }
                message['id'] = 'all'
                message['reciever'] = 'all'
                this.messages.push(message)
            } else {
                let message = {
                    message: this.myMessage,
                    messagetype: 'string',
                    filename: '',
                    sender: this.user.name,
                    id: this.chatID,
                    reciever: this.memberName
                }
                this.socket.emit('message', message)
                this.messages.push(message)
            }
            //save an instance of that message for putting it in activeChat
            // this.myMessage = message
            // console.log("My message: ", this.myMessage)
        },
        async loadMessages() {
            // Fetch messages from database
            const userMessages = await getUserMessages(this.memberName);
            console.log("User messages: ", userMessages);
            this.messages = userMessages.chatMessages;
            this.chatID = userMessages.chatID;
            const chatRoom = {
                user: this.user.name,
                chatID: userMessages.chatID
            }
            this.socket.emit('join', chatRoom)
        },
        async getChatHistories(chatid) {
            getChatHistories()
                // .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.chats) {
                        for (const [key, value] of Object.entries(data.chats)) {
                            this.all_chatIDs[value.chatID] = value.chatMessages
                            this.chatters[value.chatID] = value.chatter
                            if (this.memberName === 'all') {
                                for (const chat of value.chatMessages) {
                                    if (chat['message'].startsWith("BROADCAST!")) {
                                        this.messages.push(chat)
                                    }
                                }
                            } else {
                                for (const chat of value.chatMessages) {
                                    // if (chat['message'].startsWith("BROADCAST!")) {
                                    this.messages.push(chat)
                                    // }
                                }
                            }
                        }
                        this.user = data.username
                    }
                })
                .catch(err => console.log(err))
        },
    },

    // async created() {
    //     await this.loadMessages();
    //     this.scrollToBottom();
    // },
    async created() {
        this.loading = true
        const user = await getCurrentUser();
        this.socket = io(CHAT_URL)
        this.user = user;
        if (this.memberName === 'all') {
            await this.getChatHistories()
        } else {
            await this.loadMessages()
            console.log("My mesages: ", this.messages)
        }

        this.socket.on('message', (data) => {
            this.messages.push(data)
            this.$refs.chatbox.scrolltoBottom()
        })

        this.socket.onAny((event, ...args) => {
            console.log("socket onAny")
            console.log(event, args)
        })
        this.loading = false
    },
    beforeUnmount() {
        this.socket.disconnect()
    }



}
</script>

<style scoped>
.chatbox {
    height: calc(100vh - 342px);
    color: white;
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
    user-select: none;
    cursor: pointer;
}
</style>
