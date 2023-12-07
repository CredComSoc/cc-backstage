<template>
    <div>
        <div class="member-details-box fixed-box">
            <img v-bind:src="question_image" class="member-details-image" />
            <div class="member-details-heading">Företagsnamn</div>
            <div class="member-details-text">{{ member_details.name }}</div>
            <div class="member-details-heading">Beskrivning</div>
            <div class="member-details-text">{{ member_details.description }}</div>
            <div class="member-details-heading">Adress</div>
            <div class="member-details-text">{{ member_details.address }}</div>
            <div class="member-details-heading">Stad/Ort</div>
            <div class="member-details-text">{{ member_details.city }}</div>
            <div class="member-details-heading">Faktureringsuppgifter</div>
            <div class="member-details-text">{{ member_details.billing }}</div>
        </div>
    </div>
</template>

<script>
import question_image from './component_icons/question-sign.png';

export default {

    data() {
        return {

            question_image: question_image,

            member_details: {
                name: "Florist AB",
                description: "Hej! Vi är en blombutik i Söderköping med fem glada florister. Se våra artiklar för aktuella blombuketter just nu.",
                address: "Hantverksgatan 14",
                city: "Söderköping",
                billing: "billing details"
            },

        }
    },
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

.member-details-image {
    width: 35%;
    margin-bottom: 30px;
}

.align-right {
    text-align: right;
}

</style>
