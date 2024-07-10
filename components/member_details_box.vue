<!--
    Displays member data from the database. Also displays an image if there is one in the db, otherwise a placeholder.
-->

<template>
    <div>
        <div v-if="loading">
            <v-row>
                <v-col>
                    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                </v-col>
            </v-row>
        </div>
        <div v-if="!loading" class="member-details-box fixed-box">
            <img v-bind:src="imgUrl" class="member-details-image" />
            <div class="member-details-heading">Company name</div>
            <div class="member-details-text">{{ memberDetails.accountName }}</div>
            <div class="member-details-heading">Description</div>
            <div class="member-details-text">{{ memberDetails.description }}</div>
            <div class="member-details-heading">Address</div>
            <div class="member-details-text">{{ memberDetails.address }}</div>
            <div class="member-details-heading">City</div>
            <div class="member-details-text">{{ memberDetails.city }}</div>
            <div class="member-details-heading">Billing data</div>
            <div class="billing-details-text">{{ memberDetails.billing.name }}</div>
            <div class="billing-details-text">{{ memberDetails.billing.box }}</div>
            <div class="billing-details-text">{{ memberDetails.billing.address }}</div>
            <div class="billing-details-text">{{ memberDetails.billing.orgNumber }}</div>
        </div>
    </div>
</template>

<script>
import questionImage from './component_icons/question-sign.png';
import { getMember } from '/pages/gqlFetch.js'
import { getImg } from '/pages/expressFetch.js'

export default {


    props: ['memberName'],

    data() {
        return {

            imgUrl: questionImage, // DB holds no pictures, so use this placeholder

            memberDetails: { // Dummy data
                accountName: "Florist AB",
                description: "Hej! Vi är en blombutik i Söderköping med fem glada florister. Se våra artiklar för aktuella blombuketter just nu.",
                address: "Hantverksgatan 14",
                city: "Söderköping",
                billing: {
                    name: 'billingName',
                    box: 'billingBox',
                    address: 'billingAddress',
                    orgNumber: 'orgNumber'
                },
                logo: ""
            },
            // memberDetails: {},
            loading: false
        }
    },

    methods: {
        async updateMemberDetails() {
            this.loading = true
            this.memberDetails = await getMember(this.memberName)
            await this.getImage()
            this.loading = false
            console.log("Member details: ", this.memberDetails)
        },
        async getImage() {
            const response = await getImg(this.memberDetails.logo)
            if (response.status == 200 || response.status == 304) {
                this.imgUrl = response.url
            }
        },

    },
    mounted: async function () {
        await this.updateMemberDetails()
    }
}
</script>

<style scoped>
.member-details-box {
    height: calc(100vh - 293px);
    color: black;
}

.member-details-heading {
    font-size: large;
    font-weight: bold;
}

.member-details-text {
    margin-left: 10px;
    margin-bottom: 20px;
}

.billing-details-text {
    margin-left: 10px;
}

.member-details-image {
    width: 35%;
    margin-bottom: 30px;
}

.align-right {
    text-align: right;
}
</style>
