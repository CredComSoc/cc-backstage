
<template>
    <div class="container_all_listings">
        <ul>
            <div v-for="member in  members ">
                <li>
                    <NuxtLink :to="{ name: 'admin-member', params: { id: member.id, name: member.name } }"> Member: {{
                        member.name }}</NuxtLink> <a v-bind:href="`mailto:${member.email}`">Email</a>
                    <br>
                    <v-btn @click="initTransaction(member.name)">Init transaction</v-btn>
                    <NuxtLink :to="{ name: 'admin-offers_wants', params: { id: member.id, name: member.name } }">
                        <v-btn>Offers & Wants</v-btn>
                    </NuxtLink>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>

// import Member from '@/pages/admin/member.vue'

export default {

    data() {
        return {
            members:
                [  // Fake users array
                    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "online" },
                    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "offline" },
                    { id: 3, name: "Bob Brown", email: "bob.brown@example.com", status: "away" },
                ],
        }
    },

    methods: {
        initTransaction(member) {
            this.$router.push("/admin/member");
        },

        gotoOffersWants(member) {
            this.$router.push("/admin/offers_wants");
        }
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
