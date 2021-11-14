import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/all-products",
    name: "AllProducts",
    component: () => import("../views/ShowProducts.vue"),
  },
  {
    path: "/feeds",
    name: "Feeds",
    component: () => import("../views/Feeds.vue"),
  },
  {
    path: "/",
    name: "AddProducts",
    component: () => import("../views/AddProducts.vue"),
  },
  {
    path: "/set-prices",
    name: "SetPrices",
    component: () => import("../views/SetPrices.vue"),
  },
  {
    path: "/add-products",
    name: "Add products",
    component: () => import("../views/AddProductsWithCompare.vue"),
  },
  {
    path: "/providers",
    name: "ShowAddProviders",
    component: () => import("../views/ShowAddProviders.vue"),
  },
  {
    path: "/AddAllProducts",
    name: "AddAllProducts",
    component: () => import("../views/AddAllProducts.vue"),
  },
  {
    path: "/ShowAllProducts",
    name: "ShowAllProducts",
    component: () => import("../views/ShowAllProducts.vue"),
  },
  {
    path: "/MainAssortiment",
    name: "MainAssortiment",
    component: () => import("../views/MainAssortiment.vue"),
  },
  {
    path: "/Sources",
    name: "Sources",
    component: () => import("../views/Sources.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
