<template>
  <v-flex sm8 md6 lg3>
    <v-card>
      <v-card-title class="justify-center" primary-title>
        <h2 class="font-weight-light">Welcome back</h2>
      </v-card-title>

      <v-card-text>
        <form>
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="email"
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
          ></v-text-field>

          <v-text-field
            label="Password"
            prepend-icon="lock"
            name="password"
            v-model="password"
            v-validate="'required'"
            :append-icon="passwordTextFieldIcon"
            :error-messages="errors.collect('password')"
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
    async submit() {
      const validate = await this.$validator.validate();

      if (validate) {
        this.$store.dispatch('auth/login');
        this.$router.push({ name: 'dashboard' });
      }
    },
    reset() {
      this.email = null;
      this.password = null;
      this.$validator.reset();
    },
  },
};
</script>
