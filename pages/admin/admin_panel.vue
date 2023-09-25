<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="item in items" :key="item.route" cols="12" sm="2" class="mb-4">
        <v-btn
          block
          class="hover-effect"
          @click="navigateTo(item.route)"
        >
          {{ item.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hoveredItem: null, // to track which item is currently being hovered
      items: [
        { title: "Overview", route: "admin_overview" },
        { title: "Members", route: "admin_members" },
        { title: "Content", route: "content" },
        // ... additional items
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push("/admin/" + route);
    },
  },
};
</script>

<style scoped>
/* CSS Hover */
.hover-effect {
  transition: transform 0.3s, opacity 0.3s;
  background-color: #1976d2 !important;  /* This is the default Vuetify primary color; you can adjust it */
}
.hover-effect:hover {
  transform: scale(1.05);
  opacity: 0.6;
  background-color: #495057 !important;  /* This is a common gray color, you can adjust to the desired hover color */
}
</style>
