const showProducts = {
  state: {
    count: 0,
  },
  mutations: {
    increase(state, payload) {
      state.count += payload.amount;
    },
  },
  actions: {
    increase({ commit }, payload) {
      commit("increase", payload);
    },
  },
};

export default showProducts;
