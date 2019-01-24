import Vue from 'vue';
import Vuetify, { VList } from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VList,
  },
  iconfont: 'md',
  theme: {
    primary: '#5e35b1',
    secondary: '#424242',
    accent: '#009688',
    error: '#f44336',
    info: '#1e88e5',
    success: '#009688',
    warning: '#ffa726',
  },
});
