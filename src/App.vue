<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
export default {
  components: {
    Dashboard: () => import('./layouts/Dashboard'),
    Auth: () => import('./layouts/Auth'),
  },
  computed: {
    layout() {
      return this.$store.state.layout.current;
    },
  },
};
</script>

<style>
  @import './assets/app.css';
</style>
