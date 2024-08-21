<template>
    <div class="main">
        <button @click="addMembersClicked()" class="buttonStyle" draggable="false">
            <img class="icon" :src="addMemberIcon" alt="add Members" draggable="false">
        </button>

    </div>
</template>

<script>
import addMemberIcon from "./component_icons/add_person_1280.png";

export default {
    data() {
        return {
            addMemberIcon,
        };
    },
    methods:
    {
        addMembersClicked() {
            // this.$router.push('/admin/admin_members');
            this.$router.push({
                path: '/admin/admin_add_member',
                query: {
                    memberName: 'new'
                }
            });

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