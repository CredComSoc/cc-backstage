<!--
    Header with a search/filter box, the current page's name, and a link to the Settings page.

    The search box fires keyup events, and the parent should filter the list on its page (using the searchTerm parameter) when this happens. The parent should therefore also bind to searchTerm when using the component.
-->

<template>
    <v-row class="member-header">
        <v-col>
            <form>
                <input type="text" v-model="searchTerm" @keyup="search" placeholder="Search">
            </form>
        </v-col>
        <v-col class="member-header-middle"> {{ title }} </v-col>
        <v-col class="member-header-right">
            <NuxtLink :to="{ name: 'admin-admin_network' }">
                <div class="settings">Settings</div>
            </NuxtLink>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data() {
        return {
            searchTerm: '',
        }
    },
    props: ["title"],

    methods: {
        search() {
            this.$emit('keyup', this.searchTerm); // Parent should listen for this event
        }
    }


}
</script>

<style scoped>
.member-header {
    height: 68px;
    width: 100%;
    margin-top: 6px;
}

.member-header-middle {
    text-align: center;
    margin: auto;
    margin-left: 30px;
    color: #f53447;
    font-size: larger;
    font-weight: bold;
}

.member-header-right {
    text-align: right;
    margin: auto;
}

.settings {
    color: black;
    font-weight: bold;
    font-size: 120%;
}

form {
    max-width: 420px;
    margin: 0px auto;
    background: #ffffff;
    text-align: left;
    border-radius: 8px;
}

input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    color: #000000;
}
</style>
