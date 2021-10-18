import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: { layout: "app" },
      component: () => import("@/components/Dashboard.vue")
    },
    {
      path: "/login",
      name: "AppLogin",
      meta: { layout: "auth" },
      component: () => import("@/components/AppLogin.vue")
    },
    {
      path: "/register",
      name: "AppRegister",
      meta: { layout: "auth" },
      component: () => import("@/components/AppRegister.vue")
    },
    {
      path: "/productsList",
      name: "ProductsList",
      meta: { layout: "app" },
      component: () => import("@/components/ProductsList.vue")
    },
    {
      path: "/product/:id",
      name: "ProductDetails",
      meta: { layout: "app" },
      component: () => import("@/components/ProductDetails.vue")
    },
    {
      path: "/categoryList",
      name: "CategoryList",
      meta: { layout: "app" },
      component: () => import("@/components/CategoryList.vue")
    },
  ]
});