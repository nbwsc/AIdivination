import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/me",
      name: "me",
      component: () => import("./views/me.vue"),
    },
    {
      path: "/mycollections",
      name: "mycollections",
      component: () => import("./views/mycollections.vue"),
    },
    {
      path: "/download",
      name: "download",
      component: () => import("./views/download.vue"),
    },
    {
      path: "/models",
      name: "models",
      component: () => import("./views/models.vue"),
    },
    {
      path: "/models_en",
      name: "models_en",
      component: () => import("./views/models_en.vue"),
    },
    {
      path: "/member",
      name: "member",
      component: () => import("./views/member.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
