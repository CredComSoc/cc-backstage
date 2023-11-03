<template>
    <div>
        <member_header :title='"NETWORK ADMINISTRATION"' />
		<member_tabs 
			@click="setTabStatus" 
			:blueTabTitle='"NETWORK POLICIES"'
			:greenTabTitle='"MEMBER ADMINISTRATION"'
		/>
        <v-container v-if="networkTabVisible">

        </v-container>
		<v-container v-if="memberTabVisible">

		</v-container>
    </div>
</template>

<script>

// import Member from '@/pages/admin/member.vue'
import { getMembers } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_row from '/components/member_row.vue'
import member_tabs from '/components/member_tabs.vue'

export default {

    components: {
        member_header, member_row, member_tabs
    },

    data() {
        return {
            members: [],
            networkTabVisible: true,
        }
    },

    methods: {

		toggleToMemberTab() {
			this.memberTabVisible = false;
			this.networkTabVisible = true;
		},

		toggleToNetworkTab() {
			this.memberTabVisible = true;
			this.networkTabVisible = false;
		},
		
		setTabStatus(onNetworkTab) {
			if (onNetworkTab) {
				this.toggleToNetworkTab();
			} else {
				this.toggleToMemberTab();
			}
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
