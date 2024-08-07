import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/discover.vue"),
    },
    {
      path: "/generate",
      name: "generate",
      component: () => import("./views/generate.vue"),
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("./views/ostdetail.vue"),
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
