import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/Home.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("./components/Chat.vue"),
    },
  ],
});

export default router;
