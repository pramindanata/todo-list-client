<template>
  <v-flex sm8 md6 lg3>
    <v-card>
      <v-card-title class="justify-center" primary-title>
        <h2 class="font-weight-light primary--text">Welcome back</h2>
      </v-card-title>

      <v-card-text>
        <alert-danger
          :messages="alertMessages"
          :alert="alert"
          @set-alert="alert = $event"
        ></alert-danger>

        <form>
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="email"
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errorMessages('email')"
          ></v-text-field>

          <v-text-field
            label="Password"
            prepend-icon="lock"
            name="password"
            v-model="password"
            v-validate="'required|min:8'"
            :append-icon="passwordTextFieldIcon"
            :error-messages="errorMessages('password')"
            :type="passwordTextFieldType"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            block
            color="primary"
            :disabled="loading"
            :loading="loading"
            @click="submit"
          >
            Login
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
            :to="{ name: 'register' }"
          >
            Create an account
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  components: {
    AlertDanger: () => import('../components/AlertDanger.vue'),
  },
  data: () => ({
    alert: false,
    alertMessages: [],
    email: null,
    fieldErrorMessages: null,
    loading: false,
    password: null,
    showPassword: false,
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
    errorMessages(name) {
      if (this.errors.collect(name).length > 0) {
        return this.errors.collect(name);
      }

      if (this.fieldErrorMessages != null) {
        return this.fieldErrorMessages[name];
      }

      return [];
    },
    async submit() {
      this.alert = false;

      const validate = await this.$validator.validate();

      if (validate) {
        try {
          this.loading = true;

          const result = await this.$http.post('/login', {
            email: this.email,
            password: this.password,
          });

          this.loading = false;

          if (result) {
            this.$store.dispatch('auth/login');
            this.$router.push({ name: 'dashboard' });
          }
        } catch (err) {
          const res = err.response;

          if (res.status === 400) {
            this.fieldErrorMessages = res.data.messages;
          } else {
            this.alert = true;
            this.alertMessages = res.data.messages;
          }
        }

        this.loading = false;
      }
    },
    reset() {
      this.email = null;
      this.password = null;
      this.$validator.reset();
      this.fieldErrorMessages = null;
    },
  },
};
</script>
