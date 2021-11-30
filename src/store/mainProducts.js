const axios = require("axios");

const generateFeeds = {
  state: {
    mainProducts: null,
    idProductSourceForBinding: null,
    idMainAssortForBinding: null,
    openConfirmBinding: false
  },
  getters: {
    MAIN_PRODUCTS(state) {
      return state.mainProducts;
    },
    idProductSourceForBinding(state) {
      return state.idProductSourceForBinding;
    },
    idMainAssortForBinding(state) {
      return state.idMainAssortForBinding;
    },
    openConfirmBinding(state) {
      return state.openConfirmBinding;
    },
  },
  mutations: {
    ADD_MAIN_PRODUCTS(state, payload) {
      state.mainProducts = payload;
    },
    SET_idProductSourceForBinding(state, payload) {
      console.log('SET_idProductSourceForBinding');
      state.idProductSourceForBinding = payload;
      if (state.idProductSourceForBinding
        && state.idMainAssortForBinding) {
          state.openConfirmBinding = true;
        } else {
          state.openConfirmBinding = false;
        }
    },
    SET_idMainAssortForBinding(state, payload) {
      console.log('SET_idMainAssortForBinding');
      state.idMainAssortForBinding = payload;
      if (state.idProductSourceForBinding
        && state.idMainAssortForBinding) {
          state.openConfirmBinding = true;
        } else {
          state.openConfirmBinding = false;
        }
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
