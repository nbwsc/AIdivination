import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Shake",
      component: () => import("./components/shake.vue"),
    },
  ],
});
router.replace({ path: "*", redirect: "/" });

export default router;
