<template>
  <v-layout row>
    <v-flex sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
      <h3 v-if="showUser" class="font-weight-light mb-4">Hi {{ user.name }}, welcome back</h3>

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
            :key="`todo-${task._id}`"
            :task="task"></todo-item>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '../../stores/index';

export default {
  components: {
    TodoItem: () => import('../../components/TodoItem'),
  },
  data: () => ({
    task: null,
    showUser: false,
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.completed).length;
    },
    progress() {
      return this.completedTasks / this.tasks.length * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
    tasks() {
      return store.state.todo.todos;
    },
    user() {
      return store.state.auth.user;
    },
  },
  methods: {
    create() {
      store.dispatch('todo/restStore', {
        title: this.task,
      }).then(() => {
        this.task = null;
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.todo.todos) {
      return store.dispatch('todo/restIndex')
        .then(() => next());
    }

    return next(vm => vm.$store.dispatch('todo/restIndex'));
  },
  created() {
    store.dispatch('auth/getUser')
      .then(() => {
        this.showUser = true;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
</script>
