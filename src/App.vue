<template>
  <div id="app">
    <dashboard></dashboard>
  </div>
</template>

<script>
export default {
  components: {
    Dashboard: () => import('./layouts/Dashboard'),
  },
};
</script>
