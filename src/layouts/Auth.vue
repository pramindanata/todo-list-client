<template>
  <v-app>
    <V-content>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-container>
    </V-content>

    <dashboard-footer></dashboard-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    DashboardFooter: () => import('../components/DashboardFooter'),
  },
};
</script>
