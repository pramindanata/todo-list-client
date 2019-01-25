<template>
  <v-flex sm8 md6 lg3>
    <v-card>
      <v-card-title class="justify-center" primary-title>
        <h2 class="font-weight-light primary--text">Welcome back</h2>
      </v-card-title>

      <v-card-text>
        <alerts
          :alert="alert"
          @set-alert-error="alert.error.status = $event"
          @set-alert-success="alert.success.status = $event"
          @set-alert-warning="alert.warning.status = $event"
        ></alerts>

        <form @submit.prevent="submitListener">
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="email"
            v-model="email"
            v-validate="'required|email'"
            :error-messages="getErrorMessages('email')"
          ></v-text-field>

          <v-text-field
            label="Password"
            prepend-icon="lock"
            name="password"
            v-model="password"
            v-validate="'required|min:8'"
            :append-icon="passwordTextFieldIcon"
            :error-messages="getErrorMessages('password')"
            :type="passwordTextFieldType"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            block
            color="primary"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            Login
          </v-btn>

          <v-btn
            block
            color="secondary"
            @click="resetListener"
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
import formMixin from '../mixins/form';

export default {
  mixins: [
    formMixin,
  ],
  components: {
    Alerts: () => import('../components/Alerts.vue'),
  },
  data: () => ({
    email: null,
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
    async resetListener() {
      await this.reset();

      this.email = null;
      this.password = null;
    },
    async submitListener() {
      await this.submit({
        method: 'post',
        url: '/login',
        data: {
          email: this.email,
          password: this.password,
        },
      });

      this.$store.dispatch('auth/login');
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>
