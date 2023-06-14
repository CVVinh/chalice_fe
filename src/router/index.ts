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
      component: () => import("@/views/top/Index.vue"),
    },
    {
      path: "/makers",
      name: "Makers",
      component: () => import("@/views/Makers/Index.vue"),
    },
    {
      path: "/account",
      name: "Account",
      component: () =>
        import("@/views/Account/Index.vue"),
    },
    {
      path: "/car-search",
      name: "CarSearch",
      component: () => import("@/views/CarSearch/Index.vue"),
    },
    {
      path: "/payment_management",
      name: "Payment Management",
      component: () => import('@/views/Checkout/PaymentInfo.vue')
    },
    {
      path: "/car-details",
      name: "CarDetails",
      component: () => import("@/views/CarDetails/Index.vue")
    },
  ],
});

export default router;
