import { defaults } from 'lodash';

const reqDefOpts = {
  method: null,
  url: null,
  data: null,
  params: null,
  headers: null,
};

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
    async submit(options) {
      const opts = defaults(options, {
        scope: null,
        ...reqDefOpts,
      });

      this.alert.error.status = false;
      this.alert.success.status = false;
      this.alert.warning.status = false;
      this.alert.error.messages = [];
      this.alert.success.messages = [];
      this.alert.warning.messages = [];

      // Validate it
      return new Promise(async (resolve, reject) => {
        const validate = await this.validate(opts.scope);

        if (validate) {
          try {
            const response = await this.sendFormRequest({
              method: opts.method,
              url: opts.url,
              data: opts.data,
              params: opts.params,
              headers: opts.headers,
            });

            resolve(response);
          } catch (err) {
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
     * Compose axios and send request
     * @param {Object} options
     */
    sendFormRequest(options) {
      const opts = defaults(options, reqDefOpts);

      const config = {
        method: opts.method,
        url: opts.url,
      };

      // Setup additional config
      if (opts.data) config.data = opts.data;
      if (opts.params) config.params = opts.params;
      if (opts.headers) config.headers = opts.headers;

      return new Promise(async (resolve, reject) => {
        try {
          // Start loading, send request, and stop loading
          this.loading = true;

          const response = await this.$http(config);
          const { data: responseData } = response;

          // Set success alert
          if (responseData.messages) {
            this.alert.success.status = true;
            this.alert.success.messages = [responseData.messages];
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
