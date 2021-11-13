const generateFeeds = {
  state: {
    count: 1,
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
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

export default generateFeeds;
