<template>
  <v-flex sm8 md6 lg3>
    <v-card>
      <v-card-title class="justify-center" primary-title>
        <h2 class="font-weight-light primary--text">Join Us</h2>
      </v-card-title>

      <v-card-text>
        <form>
          <v-text-field
            label="Name"
            name="name"
            prepend-icon="person"
            v-model="name"
            v-validate="'required|alpha_spaces|min:4'"
            :error-messages="errors.collect('name')"
          ></v-text-field>

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
            color="secondary"
            @click="reset"
          >
            Reset
          </v-btn>

          <div class="my-4 primary--text font-weight-bold text-xs-center">
            <span>Or</span>
          </div>

          <v-btn
            block
            color="accent"
            :to="{ name: 'login' }"
          >
            Login Now
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    name: null,
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
        this.$router.push({ name: 'login' });
      }
    },
    reset() {
      this.name = null;
      this.email = null;
      this.password = null;
      this.$validator.reset();
    },
  },
};
</script>
