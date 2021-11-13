const axios = require('axios');

const generateFeeds = {
  state: {
    providers: null,
  },
  getters: {
    PROVIDERS(state) {
      return state.providers;
    },
  },
  mutations: {
    ADD_PROVIDERS(state, payload) {
      state.providers = payload;
    },
  },
  actions: {
    async GET_PROVIDERS({ commit }, payload) {
      payload;
      axios
        .get("http://localhost:3000/api/getProviders", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (
            result &&
            result.data && 
            result.data.data
          ) {
            commit("ADD_PROVIDERS", result.data.data);
          }
        })
        .catch(() => {
          console.log("ERROR");
          commit("ADD_PROVIDERS", null);
        });
    },
    async NEW_PROVIDER({ dispatch }, payload) {
      axios
        .post("http://localhost:3000/api/newProvider", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          dispatch('GET_PROVIDERS');          
        })
        .catch(() => {
          console.log("ERROR");
        });
    },
  },
};

export default generateFeeds;
