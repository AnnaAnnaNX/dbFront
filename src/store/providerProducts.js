const axios = require("axios");

const generateFeeds = {
  state: {
    providerProducts: null,
  },
  getters: {
    PROVIDER_PRODUCTS(state) {
      return state.providerProducts;
    },
  },
  mutations: {
    ADD_PROVIDER_PRODUCTS(state, payload) {
      state.providerProducts = payload;
    },
  },
  actions: {
    async GET_PROVIDER_PRODUCTS({ commit }, payload) {
      payload;
      axios
        .get("http://localhost:3000/api/getProviderProducts", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (result && result.data && result.data.data) {
            commit("ADD_PROVIDER_PRODUCTS", result.data.data);
          }
        })
        .catch(() => {
          console.log("ERROR");
          commit("ADD_PROVIDER_PRODUCTS", null);
        });
    },
  },
};

export default generateFeeds;
