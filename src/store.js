import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './store/userStore';
import discussions from './store/modules/discussions';
// import ui from './store/ui'

Vue.use(Vuex);

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
};

const mutations = {
  set(state, [variable, value]) {
    state[variable] = value;
  },
};

export default new Vuex.Store({
  modules: {
    // state,
    // mutations,
    userStore,
    discussions,
    // ui
  },
});
