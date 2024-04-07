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
  ],
});

export default router;
