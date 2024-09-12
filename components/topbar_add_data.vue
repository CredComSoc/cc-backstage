<template>
    <div class="main">
        <button @click="addDataClicked()" class="buttonStyle" draggable="false">
            <img class="icon" :src="addDataIcon" alt="add Data" draggable="false">
        </button>

    </div>
</template>

<script>
import addDataIcon from "./component_icons/plus_1920.png";

export default {
    data() {
        return {
            addDataIcon,
        };
    },
    methods:
    {
        addDataClicked() {
            // this.$router.push('/admin/admin_members');
            this.$router.push('/admin/data_management');

        }
    },


};
</script>

<style>
.main {
    width: 2.6rem;
    height: 2.6rem;
}

.buttonStyle {
    border: none;
    cursor: pointer;
    border-radius: 18px;
    transition: transform 0.3s ease;
}

.buttonStyle:hover {

    transform: scale(1.05);
}
</style>