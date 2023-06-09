import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login/Index.vue"),
    },
    {
      path: "/Top",
      name: "TOP",
      component: () => import("@/views/Top/Index.vue"),
    },
  ],
});

export default router;
