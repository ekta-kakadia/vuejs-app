<template>
  <v-container>
    <v-card class="text-center h-100">
      <v-card-title class="text-center"> Welcome to shop ! </v-card-title>
      <v-card-text>
        <router-link to="/productsList">View products</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
