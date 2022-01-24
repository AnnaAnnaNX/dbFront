const axios = require("axios");

const generateFeeds = {
  state: {
    providerProducts: null,
    assort: null
  },
  getters: {
    PROVIDER_PRODUCTS(state) {
      return state.providerProducts;
    },
    ASSORT(state) {
      return state.assort;
    },
  },
  mutations: {
    ADD_PROVIDER_PRODUCTS(state, payload) {
      state.providerProducts = payload;
    },
    SET_ASSORT(state, payload) {
      state.assort = payload;
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
    async CHANGE_MARKUP({ dispatch }, payload) {
      payload;
      axios
        .post("http://localhost:3000/api/changeMarkup", payload)
        .then((result) => {
          if (result && result.data) {
            console.log('CHANGE_MARKUP success');
            // alert('успешно изменена наценка');
          }          
          dispatch("GET_ASSORT");
        })
        .catch(() => {
          console.log('CHANGE_MARKUP error');
        });
    },
    async GET_ASSORT({ commit }, payload) {
      payload;
      axios
        .get("http://localhost:3000/api/getAssort")
        .then((result) => {
          console.log('GET_ASSORT success');
          if (result && result.data) {
            commit("SET_ASSORT", result.data);
          }
        })
        .catch(() => {
          console.log('GET_ASSORT error');
          commit("SET_ASSORT", null);
        });
    },

  },
};

export default generateFeeds;
