<template>
  <div class="main">
    <button @click="questionClicked()" class="buttonStyle" draggable="false">
      <img class="icon" :src="questionIcon" alt="Question" draggable="false">
    </button>

    <v-dialog v-model="toDisplay" max-width="600">
      <v-card>
        <v-card-title class="headline">
          Adminpanel User information
        </v-card-title>
        <v-card-text>
          {{ pageContent }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="toDisplay = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import questionIcon from "./component_icons/info.png";
export default {
  data() {
    return {
      questionIcon,
      toDisplay: false,
      pageContent: "No page info implemented" 
    };
  },
  methods: {
    questionClicked() {
      console.log("Question clicked");
      this.updateContent();
      this.toDisplay = true;
    },
    updateContent() 
    {
      const currentRoute = this.$route.name || this.$route.path;
      if (currentRoute === "admin-admin_overview") 
      {
        this.pageContent = "Overview";
      } 
      else if (currentRoute === "admin-admin_members") 
      {
        this.pageContent = "Members";
      } // Add more conditions for other routes as needed
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
  background-color: gray;
  transform: scale(1.05);
}
</style>
