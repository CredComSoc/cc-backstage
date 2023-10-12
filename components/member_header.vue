<template>
<v-container class="member-header">
    <v-row>
        <v-col>
            <form>
                <input type="text" v-model="search">
            </form>
        </v-col>
        <v-col class="member-header-middle">ALL MEMBERS</v-col>
        <v-col class="member-header-right">Settings</v-col>
    </v-row>
</v-container>
</template>

<script>
export default {

    data() {
        return {
            search: 'Search',
        }
    },
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
</style>