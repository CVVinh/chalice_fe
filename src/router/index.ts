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
      name: "PaymentManagement",
      component: () => import('@/views/Checkout/PaymentInfo.vue')
    },
    {
      path: "/paymentsuccess",
      name: "Payment Success",
      component: () => import('@/views/SuccessPayment/SuccessPayment.vue')
    },
  ],
});

export default router;
