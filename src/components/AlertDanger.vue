<template>
  <base-alert
    type="error"
    :messages="messages"
    :alert="alert"
    @set-alert="setAlert($event)"
  ></base-alert>
</template>

<script>
export default {
  props: {
    messages: {
      default: () => [],
      required: true,
      type: Array,
    },
    alert: {
      default: false,
      required: true,
      type: Boolean,
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
