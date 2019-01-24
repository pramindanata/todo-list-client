<template>
  <v-toolbar
    app
    color="primary"
    dark
    fixed
  >
    <v-icon>
      home
    </v-icon>
    <v-toolbar-title>
      <router-link :to="{ name: 'dashboard' }">Todo List</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="logout">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
  .v-toolbar__title > a {
    color: inherit;
    text-decoration: none;
  }
</style>
