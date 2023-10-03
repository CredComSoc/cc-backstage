
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
            members:[]

        }
    },

    methods: {
        initTransaction(member) {
            this.$router.push("/admin/member");
        },

        gotoOffersWants(member) {
            this.$router.push("/admin/offers_wants");
        },
        async getMembers(){
            var member_arr
            await fetch("/api/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({ query: "{ allMembers{ id, name, balance, status, phone}  }" }),
            }).then(r => r.json())
            .then(data => member_arr = data)
            member_arr = member_arr.data.allMembers
            console.log(member_arr)
            this.members = member_arr
            console.log(this.members)
        }

    },
    mounted: function(){
        this.getMembers()
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
