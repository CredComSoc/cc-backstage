<template>
    <div class="main">
      <button @click="membersClicked()" class="buttonStyle" draggable="false">
        <img class="icon" :src="memeberIcon" alt="Members" draggable="false">
      </button>

    </div>
</template>
  
<script>
  import memeberIcon from "./component_icons/memberlist.png";
  export default {
    data() {
      return {
        memeberIcon,        
      };
    },
    methods:
    {
      membersClicked()
      {
        this.$router.push('/admin/admin_members');

      }
    }

  };
</script>
  
  <style scoped>
  .main 
  {
    width: 2vw;
    height: 4vh;
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
  