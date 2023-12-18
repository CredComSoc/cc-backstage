<template>
    <div class="main">
      <button @click="membersClicked()" class="buttonStyle" draggable="false">
        <img class="icon" :src="memberIcon" alt="Members" draggable="false">
      </button>

    </div>
</template>
  
<script>
  import memberIcon from "./component_icons/memberlist.png";
  
  export default {
    data() {
      return {
        memberIcon,
      };
    },
    methods:
    {
      membersClicked()
      {
        this.$router.push('/admin/admin_members');

      }
    },
   

  };
</script>
  
  <style>
  .main 
  {
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
  