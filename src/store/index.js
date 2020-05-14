import Vuex from 'vuex';
import Vue from 'vue';
import demo from './modules/demo';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    demo,
  },
});
