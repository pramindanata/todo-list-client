<template>
  <v-toolbar
    app
    color="green"
    dark
    fixed
  >
    <v-icon>
      home
    </v-icon>
    <v-toolbar-title>
      <router-link :to="{ name: 'dashboard' }">Todo List</router-link>
    </v-toolbar-title>
  </v-toolbar>
</template>

<style scoped>
  .v-toolbar__title > a {
    color: inherit;
    text-decoration: none;
  }
</style>
