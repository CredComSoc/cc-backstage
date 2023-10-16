
<template>
    <div>
        <member_header></member_header>
        <v-container>
            <v-row v-for="member in members">
                <v-col class="accountName_col">
                    {{ member.accountName }}
                </v-col>
                <v-col>
                    {{ member.balance }} SEK
                </v-col>

                <v-col>
                    {{ member.status }}
                </v-col>

                <v-col>
                    {{ member.phone }}
                </v-col>

                <v-col>
                    <NuxtLink :to="{
                        name: 'admin-member',
                        params: { id: member.id, name: member.accountName }
                    }">
                        <v-btn>Account</v-btn>
                    </NuxtLink>
                </v-col>

                <v-col>
                    <NuxtLink :to="{
                        name: 'admin-member',
                        params: { id: member.id, name: member.accountName }
                    }">
                        <v-btn>Transact</v-btn>
                    </NuxtLink>
                </v-col>

                <v-col>
                    <a v-bind:href="`mailto:${member.email}`">
                        <v-btn>Email</v-btn>
                    </a>
                </v-col>

                <v-col>
                    <NuxtLink :to="{ name: 'admin-offers_wants', params: { id: member.id, name: member.accountName } }">
                        <v-btn>Offers & Wants</v-btn>
                    </NuxtLink>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

// import Member from '@/pages/admin/member.vue'
import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'


export default {

    components: {
        member_header
    },

    data() {
        return {
            members: [],
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
    font-weight: bold;;
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
