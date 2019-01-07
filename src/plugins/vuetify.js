import Vue from 'vue';
import Vuetify, { VList } from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VList,
  },
  iconfont: 'md',
});
