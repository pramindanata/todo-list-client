<template>
  <v-layout row>
    <v-flex sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
      <h3 class="font-weight-light mb-4">Hi {{ user.name }}, welcome back</h3>

      <v-text-field
        v-model="task"
        label="What are you working on ?"
        solo
        @keydown.enter="create"
      >
        <v-fade-transition slot="append">
          <v-icon
            v-if="task"
            @click="create"
          >
            add_circle
          </v-icon>
        </v-fade-transition>
      </v-text-field>

      <h2 class="display-1 primary--text pl-3">
        Task: &nbsp;
        <v-fade-transition leave-absolute>
          <span :key="`tasks-${tasks.length}`">
            {{ tasks.length }}
          </span>
        </v-fade-transition>
      </h2>

      <v-divider class="mt-3"></v-divider>

      <v-layout
        my-1
        align-center
      >
        <strong class="mx-3 info--text text--darken-3">
          Remaining: {{ remainingTasks }}
        </strong>

        <v-divider vertical></v-divider>

        <strong class="mx-3 back--text">
          Completed: {{ completedTasks }}
        </strong>

        <v-spacer></v-spacer>

        <v-progress-circular
          :value="progress"
          class="mr-2"
        ></v-progress-circular>
      </v-layout>

      <v-divider class="mb-3"></v-divider>

      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition
          class="py-0"
          group
          tag="v-list"
        >
          <todo-item
            v-for="(task, i) in tasks"
            :i="i"
            :key="`todo-${i}`"
            :task="task"></todo-item>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
    TodoItem: () => import('../../components/TodoItem'),
  },
  data: () => ({
    task: null,
    tasks: [],
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return this.completedTasks / this.tasks.length * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    create() {
      this.tasks.push({
        text: this.task,
        done: false,
      });

      this.task = null;
    },
  },
};
</script>
