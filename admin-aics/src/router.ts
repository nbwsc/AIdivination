import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home.vue"),
    },
    {
      path: "/console",
      name: "console",
      component: () => import("./views/console.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/privacy.vue"),
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("./views/terms.vue"),
    },
  ],
});

export default router;
