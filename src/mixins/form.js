export default {
  data: () => ({
    alert: {
      error: {
        status: false,
        messages: [],
      },
      success: {
        status: false,
        messages: [],
      },
      warning: {
        status: false,
        messages: [],
      },
    },
    serverSideErrorMessages: [],
    loading: false,
  }),
  methods: {
    /**
     * Submit listener
     * @param {Object} options
     */
    submit(action, payload, scope = null) {
      this.alert.error.status = false;
      this.alert.success.status = false;
      this.alert.warning.status = false;
      this.alert.error.messages = [];
      this.alert.success.messages = [];
      this.alert.warning.messages = [];

      // Validate it
      return new Promise(async (resolve, reject) => {
        const validate = await this.validate(scope);

        if (validate) {
          try {
            this.loading = true;

            const response = await this.$store.dispatch(action, payload);
            // Set success alert
            if (response.data.messages) {
              this.alert.success.status = true;
              this.alert.success.messages = [response.data.messages];
            }

            this.loading = false;

            resolve(response);
          } catch (err) {
            // Get errors and stop loading
            const res = err.response;

            // Error when response not exists
            if (!res) {
              this.alert.error.status = true;
              this.alert.error.messages = [err.message];
            }

            // Error when response exists
            if (res) {
              if (res.status === 400) {
                // Bad request / Form validation error
                this.serverSideErrorMessages = res.data.messages;
              } else {
                // Other error(s)
                this.alert.error.status = true;
                this.alert.error.messages = res.data.messages;
              }
            }

            this.loading = false;

            // Reject to add additional handler on component side
            reject(err);
          }
        }
      });
    },

    /**
     * Get error message for input field;
     * @param String name
     * @return Array
     */
    getErrorMessages(name) {
      // Get error messages from vee-validator ErrorBag instance
      if (this.errors.collect(name).length > 0) {
        return this.errors.collect(name);
      }

      // Get error messages from server side validation
      if (this.serverSideErrorMessages !== []) {
        return this.serverSideErrorMessages[name];
      }

      return [];
    },

    /**
     * Reset alert and form fields value
     */
    reset() {
      return new Promise((resolve) => {
        this.$validator.reset();
        this.serverSideErrorMessages = [];

        resolve();
      });
    },

    /**
     * Run vee-validate's validation event
     * @param {String} scope
     */
    validate(scope) {
      return new Promise(async (resolve) => {
        if (scope) {
          // Validate scoped form
          const result = await this.$validator.validateAll(scope);

          resolve(result);
        } else {
          // Validate non scoped form
          const result = await this.$validator.validate();

          resolve(result);
        }
      });
    },
  },
};
