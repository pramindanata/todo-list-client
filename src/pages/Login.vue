<template>
  <v-flex sm8 md6 lg3>
    <v-card>
      <v-card-title class="justify-center" primary-title>
        <h2 class="font-weight-light">Welcome back</h2>
      </v-card-title>

      <v-card-text>
        <form>
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="email"
            required
            type="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="lock"
            required
            :append-icon="passwordTextFieldIcon"
            :type="passwordTextFieldType"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            block
            color="primary"
            @click="submit"
          >
            Submit
          </v-btn>

          <v-btn
            block
            color="warning"
            @click="reset"
          >
            Reset
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    email: null,
    showPassword: false,
    password: null,
  }),
  computed: {
    passwordTextFieldIcon() {
      return this.showPassword ? 'visibility' : 'visibility_off';
    },
    passwordTextFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('auth/login');
      this.$router.push({ name: 'dashboard' });
    },
    reset() {
      this.email = null;
      this.password = null;
    },
  },
};
</script>
