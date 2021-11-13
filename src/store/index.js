import Vue from "vue";
import Vuex from "vuex";
import addUpdateProducts from "./addUpdateProducts";
import generateFeeds from "./generateFeeds";
import showProducts from "./showProducts";
import providers from "./providers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addUpdateProducts,
    generateFeeds,
    showProducts,
    providers
  },
});
