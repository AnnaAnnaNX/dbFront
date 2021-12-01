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
          console.log('SET true');      
        } else {
          state.openConfirmBinding = false;
          console.log('SET false');      
        }
    },
    SET_idMainAssortForBinding(state, payload) {
      console.log('SET_idMainAssortForBinding');
      state.idMainAssortForBinding = payload;
      if (state.idProductSourceForBinding
        && state.idMainAssortForBinding) {
          state.openConfirmBinding = true;
          console.log('SET true');      
        } else {
          state.openConfirmBinding = false;
          console.log('SET false');      
        }
    },
    SET_openConfirmBinding(state, payload) {
      state.openConfirmBinding = payload;
      console.log('click SET_openConfirmBinding');
    }
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
    async ADD_LINK({ commit, dispatch }, payload) {
      console.log('ADD_LINK');
      console.log(payload);
      if (!payload
        || !payload.idProductProvider
        || !payload.idProvider) {
          alert('error');
          return;
        }
      const obj = {
        idProductProvider: payload.idProductProvider,
        idProvider: parseInt(payload.idProvider, 10),
      };
      if (payload.idMainProduct) {
        obj.idMainProduct = parseInt(payload.idMainProduct, 10);
      }
      console.log('obj');
      console.log(obj);
      await axios
        .post("http://localhost:3000/api/addLink", obj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log("SUCCESS");
          // alert("Связан");
          commit('SET_idProductSourceForBinding', null);
          commit('SET_idMainAssortForBinding', null);
          dispatch('GET_MAIN_PRODUCTS');
          dispatch('GET_PROVIDER_PRODUCTS');
        })
        .catch(() => {
          console.log("ERROR");
          alert("Ошибка");
        });
      }

  },
};

export default generateFeeds;
