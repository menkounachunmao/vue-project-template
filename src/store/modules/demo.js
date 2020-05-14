const ADD_COUNT = 'ADD_COUNT';
const state = {
  count: 0,
};

const actions = {
  addCount({ commit }) {
    commit('ADD_COUNT');
  },
};

const mutations = {
  [ADD_COUNT](state) {
    state.count++;
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
