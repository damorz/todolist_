import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/addtask",
    name: "AddTask",
    component: () => import("../views/AddTask.vue"),
  },
  {
    path: "*",
    component: () => import("../views/Error.vue"),
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
