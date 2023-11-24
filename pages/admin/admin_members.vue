<template>
    <div>
        <member_header :title='"ALL MEMBERS"' />
        <member_tabs @click="setTabStatus" :blueTabTitle='"MEMBERS"' :greenTabTitle='"TRANSACTIONS"' />
        <div v-if="onBlueTab">
            <v-row class="member-row-headings">
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
            <div class="fixed-box">
                <member_row v-for="member in members" :id="member.id" :accountName="member.accountName"
                    :balance="member.balance" :status="member.status" :phone="member.phone" :email="member.email" />
            </div>
        </div>
        <div v-else>
            <v-row v-for="transaction in transactions">
                <v-col>
                    {{ transaction.date }}
                </v-col>
                <v-col>
                    {{ transaction.payer }}
                </v-col>
                <v-col>
                    {{ transaction.receiver }}
                </v-col>
                <v-col>
                    {{ transaction.amount }}
                </v-col>
                <v-col>
                    <NuxtLink :to="{ name: '', params: {} }">
                        <v-btn>Reverse</v-btn>
                    </NuxtLink>
                </v-col>
            </v-row>
        </div>
        <div class="admin-box">
            <admin_row :id="admin.id" :accountName="admin.accountName" :balance="admin.balance" />
        </div>
    </div>
</template>

<script>

import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_row from '/components/member_row.vue'
import member_tabs from '/components/member_tabs.vue'
import admin_row from '/components/admin_row.vue'

export default {

    components: {
        member_header, member_row, member_tabs, admin_row
    },

    data() {
        return {
            members: [],
            admin: { id: 0, accountName: "SB ADMIN", balance: 1999 },
            onBlueTab: true,

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
        setTabStatus(onBlueTab) {
            this.onBlueTab = onBlueTab
        }
    },
    mounted: function () {
        this.updateMembers()
    }

}
</script>

<style scoped>
.member-row-headings {
    flex-basis: 16%;
    font-weight: bold;
    border-bottom: 1px solid #ffffff;
}

.admin-box {
    bottom: 0px;
    margin-top: 20px;
    width: 100%;
}
</style>
