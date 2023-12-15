<template>
    <div>
        <member_header @keyup="onSearch" :title='"NETWORK ADMINISTRATION"' />
        <v-row>
            <v-col cols="8">
                <member_tabs @click="setTabStatus" :blueTabTitle='"NETWORK POLICIES"'
                    :greenTabTitle='"MEMBER ADMINISTRATION"' />
                <div class="mainContainer">
                    <v-container v-if="onBlueTab">
                        <form action="submit">
                            <label>Transaction Fee</label>
                            <v-container style="padding-left: 0px;">
                                <v-row>
                                    <v-col>
                                        <input type="text" placeholder="seller percentage">
                                    </v-col>
                                    <v-col>
                                        <input type="text" placeholder="buyer percentage">
                                    </v-col>
                                </v-row>
                            </v-container>
                            <label>Interest on BSEK</label>
                            <v-container style="padding-left: 0px;">
                                <v-row>
                                    <v-col>
                                        <input type="text" placeholder="percentage">
                                    </v-col>
                                </v-row>
                            </v-container>
                            <label>Default Balance Limits</label>
                            <v-container style="padding-left: 0px;">
                                <v-row>
                                    <v-col>
                                        <input type="text" placeholder="Maximium">
                                    </v-col>
                                    <v-col>
                                        <input type="text" placeholder="Minimum">
                                    </v-col>
                                </v-row>
                            </v-container>
                        </form>
                    </v-container>
                    <v-container v-else>
                        <!-- Place for Member admin section-->
                    </v-container>
                </div>
            </v-col>
            <v-col cols="4">
                <chat_tabs @click="setChatboxTabStatus" :leftTabTitle='"NOTIFICATIONS/LOG"'
                    :rightTabTitle='"MEMBER CHAT"' />
                <notification_box v-if=onLeftChatboxTab />
                <chatbox v-else />
            </v-col>
        </v-row>
    </div>
</template>

<script>

// import Member from '@/pages/admin/member.vue'
import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_row from '/components/member_row.vue'
import member_tabs from '/components/member_tabs.vue'
import chat_tabs from '/components/chat_tabs.vue'
import chatbox from '/components/chatbox.vue'
import notification_box from '/components/notification_box.vue'

export default {

    components: {
        member_header, member_row, member_tabs, chat_tabs, chatbox, notification_box
    },

    data() {
        return {
            members: [],
            onBlueTab: true,
            onLeftChatboxTab: true,
        }
    },

    onSearch(searchTerm) {
    },

    methods: {
        setTabStatus(onBlueTab) {
            this.onBlueTab = onBlueTab
        },
        setChatboxTabStatus(onLeftChatboxTab) {
            this.onLeftChatboxTab = onLeftChatboxTab
        },
    },

}
</script>

<style scoped>
div.mainContainer {
    height: 70vh;
    /* border: 1px solid black; */
    margin: 0px;
}

form {
    margin: 0px auto;
    text-align: left;
    padding: 25px;
}


input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    color: #000000;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;

}
</style>
