const ADD_COUNT = 'ADD_COUNT';
let state = {
  count: 0,
};

let actions = {
  addCount({ commit }) {
    commit('ADD_COUNT');
  },
};

let mutations = {
  [ADD_COUNT](state) {
    state.count++;
  },
};

let getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
