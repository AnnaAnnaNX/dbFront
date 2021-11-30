const axios = require("axios");

const generateFeeds = {
  state: {
    mainProducts: null,
  },
  getters: {
    MAIN_PRODUCTS(state) {
      return state.mainProducts;
    },
  },
  mutations: {
    ADD_MAIN_PRODUCTS(state, payload) {
      state.mainProducts = payload;
    },
  },
  actions: {
    async GET_MAIN_PRODUCTS({ commit }, payload) {
      payload;
      axios
        .get("http://localhost:3000/api/getAssort", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (result && result.data && result.data.rows) {
            commit("ADD_MAIN_PRODUCTS", result.data.rows);
          }
        })
        .catch(() => {
          console.log("ERROR");
          commit("ADD_MAIN_PRODUCTS", null);
        });
    },
  },
};

export default generateFeeds;
