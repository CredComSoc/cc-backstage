<template>
    <div>
        <div class="member-details-box fixed-box">
            <img v-bind:src="questionImage" class="member-details-image" />
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

export default {

    props: ['memberName'],

    data() {
        return {

            questionImage: questionImage,

            memberDetails: {
                accountName: "Florist AB",
                description: "Hej! Vi är en blombutik i Söderköping med fem glada florister. Se våra artiklar för aktuella blombuketter just nu.",
                address: "Hantverksgatan 14",
                city: "Söderköping",
                billing: {
                    name: 'billingName',
                    box: 'billingBox',
                    address: 'billingAddress',
                    orgNumber: 'orgNumber'
                }
            },

        }
    },

    methods: {
        async updateMember() {
            this.memberDetails = await getMember(this.memberName)
            alert(this.memberDetails.accountName)
        },
    },
    mounted: function () {
        this.updateMember()
        alert(this.memberName)
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
