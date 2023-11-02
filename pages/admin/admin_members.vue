<template>
    <div>
        <member_header :title="title" />
        <v-container>
            <member_row v-for="member in members" :id="member.id" :accountName="member.accountName"
                :balance="member.balance" :status="member.status" :phone="member.phone" :email="member.email" />
        </v-container>
    </div>
</template>

<script>

// import Member from '@/pages/admin/member.vue'
import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_row from '/components/member_row.vue'

export default {

    components: {
        member_header, member_row
    },

    data() {
        return {
            members: [],
            title: "ALL MEMBERS"
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
        }
    },
    mounted: function () {
        this.updateMembers()
    }

}
</script>

<style scoped>
.member-header {
    width: 100%;
}

.member-header-middle {
    text-align: center;
    margin: auto;
    color: rgb(165, 9, 9);
    font-size: large;
    font-weight: bold;
    ;
}

.member-header-right {
    text-align: right;
    margin: auto;
}

form {
    max-width: 420px;
    margin: 0px auto;
    background: #ddd;
    text-align: left;
}

input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    color: #000000;
}

.container_all_listings {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: max(20rem, 60%);
    margin: auto;
}


ul {
    padding: 0;
    margin: auto;

}

.accountName_col {
    width: 500px;
}

.container_all_listings>* {
    flex-basis: 100%;
    width: 100%;
}

li {
    list-style-type: none;
    margin-bottom: 15px;
}

h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}
</style>
