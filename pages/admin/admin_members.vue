
<template>
    <div>
        <v-container>
            <v-row v-for="member in members">
                <v-col class="name_col">
                    {{ member.name }}
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
                        params: { id: member.id, name: member.name }
                    }">
                        <v-btn>Account</v-btn>
                    </NuxtLink>
                </v-col>

                <v-col>
                    <NuxtLink :to="{
                        name: 'admin-member',
                        params: { id: member.id, name: member.name }
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
                    <NuxtLink :to="{ name: 'admin-offers_wants', params: { id: member.id, name: member.name } }">
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


export default {

    data() {
        return {
            members: []
            /*
            members: [
                {
                    id: 1,
                    name: "John Doe",
                    balance: 100,
                    status: "Online",
                    phone: 33333,
                    email: "john.doe@example.com"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    balance: 200,
                    status: "Offline",
                    phone: 33333,
                    email: "jane.smith@example.com"
                },
                {
                    id: 3,
                    name: "Bob Brown",
                    balance: 300,
                    status: "Away",
                    phone: 50302,
                    email: "bob.brown@example.com"
                }
            ]
            */
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

.name_col {
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
