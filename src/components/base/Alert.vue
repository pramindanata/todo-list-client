<template>
  <div class="mb-3">
    <v-alert
      dismissible
      transition="fade-transition"
      v-model="alertModel"
      :type="type"
    >
      <ul v-if="messages.length > 1">
        <li v-for="(message, i) in messages" :key="i">{{ message }}</li>
      </ul>

      <span v-else>{{ messages[0] }}</span>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String,
    },
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
  computed: {
    alertModel: {
      get() {
        return this.alert;
      },
      set(value) {
        this.$emit('set-alert', value);
      },
    },
  },
};
</script>
