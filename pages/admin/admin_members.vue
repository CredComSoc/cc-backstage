<template>
    <div>
        <member_header :title='"ALL MEMBERS"' />
        <v-row>
            <v-col cols="8">
                <member_tabs @click="setMemberListTabStatus" :blueTabTitle='"MEMBERS"' :greenTabTitle='"TRANSACTIONS"' />
                <div v-if="onBlueTab">
                    <v-row class="row-headings">
                        <v-col cols="2">
                            <h1>Member</h1>
                        </v-col>
                        <v-col cols="2">
                            <h1>Balance</h1>
                        </v-col>
                        <v-col cols="1">
                            <h1>Status</h1>
                        </v-col>
                        <v-col cols="2">
                            <h1>Phone number</h1>
                        </v-col>
                    </v-row>
                    <div class="fixed-box fixed-box-with-admin">
                        <member_row v-for="member in members" :id="member.id" :accountName="member.accountName"
                            :balance="member.balance" :status="member.status" :phone="member.phone" :email="member.email" />
                    </div>
                    <div class="admin-box">
                        <admin_row :id="admin.id" :accountName="admin.accountName" :balance="admin.balance" />
                    </div>
                </div>
                <div v-else>
                    <v-row class="row-headings">
                        <v-col cols="2">
                            <h1>Date</h1>
                        </v-col>
                        <v-col cols="3">
                            <h1>Payer</h1>
                        </v-col>
                        <v-col cols="3">
                            <h1>Receiver</h1>
                        </v-col>
                        <v-col cols="2">
                            <h1>Amount</h1>
                        </v-col>
                    </v-row>
                    <div class="fixed-box fixed-box-no-admin">
                        <v-row class="top-border" v-for="transaction in transactions">
                            <v-col cols="2" class="row-text">
                                {{ transaction.date }}
                            </v-col>
                            <v-col cols="3" class="row-text">
                                {{ transaction.payer }}
                            </v-col>
                            <v-col cols="3" class="row-text">
                                {{ transaction.receiver }}
                            </v-col>
                            <v-col cols="2" class="row-text">
                                {{ transaction.amount }}
                            </v-col>
                            <v-col class="button-row">
                                <NuxtLink :to="{ name: '', params: {} }">
                                    <div class="white-button">Reverse</div>
                                </NuxtLink>
                            </v-col>
                        </v-row>
                    </div>
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

import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_row from '/components/member_row.vue'
import member_tabs from '/components/member_tabs.vue'
import chat_tabs from '/components/chat_tabs.vue'
import admin_row from '/components/admin_row.vue'
import chatbox from '/components/chatbox.vue'
import notification_box from '/components/notification_box.vue'

export default {

    components: {
        member_header, member_row, member_tabs, chat_tabs, admin_row, chatbox, notification_box
    },

    data() {
        return {
            members: [],
            admin: { id: 0, accountName: "SB ADMIN", balance: 1999 },

            onBlueTab: true,
            onLeftChatboxTab: true,

            transactions: [
                { date: "2023-09-12", payer: "Anna Karlsson", receiver: "Ben Johnson", amount: "110" },
                { date: "2023-09-12", payer: "Patrik Olsson", receiver: "John Benson", amount: "22" },
                { date: "2020-01-10", payer: "Stina Karlsson", receiver: "Sune Mangs", amount: "220" }
            ],

        }
    },

    methods: {
        initTransaction(member) {
            this.$router.push("/admin/member");
        },

        gotoOffersWants(member) {
            this.$router.push("/admin/offers_wants");
        },

        async updateMembers() {
            this.members = await getMembers()
        },
        setMemberListTabStatus(onBlueTab) {
            this.onBlueTab = onBlueTab
        },
        setChatboxTabStatus(onLeftChatboxTab) {
            this.onLeftChatboxTab = onLeftChatboxTab
        }

    },
    mounted: function () {
        this.updateMembers()
    }

}
</script>

<style scoped>
.admin-box {
    bottom: 0px;
    margin-top: 20px;
    width: 100%;
}

.chatbox {
    color: white;
    background-color: black;
}
</style>
