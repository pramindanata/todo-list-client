<template>
  <div>
    <base-alert
      type="error"
      :alert="alert.error.status"
      :messages="alert.error.messages"
      @set-alert-error="setAlert($event)"
    ></base-alert>

    <base-alert
      type="success"
      :alert="alert.success.status"
      :messages="alert.success.messages"
      @set-alert-success="setAlert($event)"
    ></base-alert>

    <base-alert
      type="warning"
      :alert="alert.warning.status"
      :messages="alert.warning.messages"
      @set-alert-warning="setAlert($event)"
    ></base-alert>
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      required: true,
      type: Object,
    },
  },
  components: {
    BaseAlert: () => import('./base/Alert.vue'),
  },
  methods: {
    setAlert(value) {
      this.$emit('set-alert', value);
    },
  },
};
</script>
