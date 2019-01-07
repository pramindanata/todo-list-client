<template>
  <div>
    <v-divider v-if="i != 0"></v-divider>

    <v-list-tile>
      <v-list-tile-action>
        <v-checkbox
          v-model="task.done"
          color="info darken-3"
        >
          <div
            slot="label"
            :class="task.done && 'grey--text' || 'text--primary'"
            class="ml-3"
            v-text="task.text"
          ></div>
        </v-checkbox>
      </v-list-tile-action>

      <v-spacer></v-spacer>

      <v-scroll-x-transition>
        <v-icon
          v-if="task.done"
          color="success"
        >
          check
        </v-icon>
      </v-scroll-x-transition>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: {
    i: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
