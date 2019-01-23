import Vue from 'vue';
import moment from 'moment';

Vue.use({
  // eslint-disable-next-line no-shadow
  install: () => {
    Object.defineProperty(Vue.prototype, '$moment', { value: moment });
  },
});
