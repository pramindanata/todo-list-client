<template>
  <div>
    <v-divider v-if="i != 0"></v-divider>

    <v-list-tile>
      <v-list-tile-action>
        <v-checkbox
          color="info darken-3"
          v-model="task.completed"
          :disabled="loading"
          @change="toggle"
        >
          <div
            slot="label"
            :class="titleColor"
            class="ml-3"
            v-text="task.title"
          ></div>
        </v-checkbox>
      </v-list-tile-action>

      <v-spacer></v-spacer>

      <v-progress-circular
        v-if="loading"
        indeterminate
        :color="loadingColor"
      ></v-progress-circular>

      <v-scroll-x-transition>
        <v-icon
          v-if="task.completed && !loading"
          color="success"
        >
          check
        </v-icon>
      </v-scroll-x-transition>

      <v-btn icon @click="remove">
        <v-icon color="error">delete</v-icon>
      </v-btn>
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
  data: () => ({
    loading: false,
    loadingColor: null,
  }),
  computed: {
    titleColor() {
      return this.loading ? 'grey--text' : 'secondary--text';
    },
  },
  methods: {
    toggle() {
      this.loading = true;
      this.loadingColor = 'primary';
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('todo/restToggle', this.task._id)
        .then(() => {
          this.loading = false;
        });
    },
    remove() {
      this.loading = true;
      this.loadingColor = 'error';
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('todo/restRemove', this.task._id)
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>
