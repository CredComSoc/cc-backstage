<template>
    <div>
        <member_header :title='"NETWORK ADMINISTRATION"' />
        <member_tabs @click="setTabStatus" :blueTabTitle='"NETWORK POLICIES"' :greenTabTitle='"MEMBER ADMINISTRATION"' />
        <div class="mainContainer">
            <v-container v-if="onBlueTab">
                <form action="submit">
                    <label>Transaction Fee</label>
                    <v-container>
                        <v-row>
                            <v-col>
                                <input type="text" placeholder="seller percentage">
                            </v-col>
                            <v-col>
                                <input type="text" placeholder="buyer percentage">
                            </v-col>
                        </v-row>
                    </v-container>
                    <label>Interest on BSEK</label>
                    <v-container>
                        <v-row>
                            <v-col>
                                <input type="text" placeholder="percentage">
                            </v-col>
                        </v-row>
                    </v-container>
                    <label>Default Balance Limits</label>
                    <v-container>
                        <v-row>
                            <v-col>
                                <input type="text" placeholder="Maximium">
                            </v-col>
                            <v-col>
                                <input type="text" placeholder="Minimum">
                            </v-col>
                        </v-row>
                    </v-container>
                </form>
            </v-container>
            <v-container v-else>

            </v-container>
        </div>
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
            onBlueTab: true,
        }
    },

    methods: {
        setTabStatus(onBlueTab) {
            this.onBlueTab = onBlueTab
        }
    },

}
</script>

<style scoped>
div.mainContainer {
    height: 70vh;
    /* border: 1px solid black; */
    margin: 0px;
}

form {
    margin: 0px auto;
    text-align: left;
    padding: 25px;
}


input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    color: #000000;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;

}
</style>
