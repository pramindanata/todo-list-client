<template>
  <v-app>
    <dashboard-toolbar></dashboard-toolbar>

    <v-content>
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <dashboard-footer></dashboard-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    DashboardToolbar: () => import('../components/DashboardToolbar'),
    DashboardFooter: () => import('../components/DashboardFooter'),
  },
};
</script>
