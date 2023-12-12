import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: "/",
    component: () => import("@/views/loginView.vue"),
  },
  {
    name: 'dashboard',
    path: "/dashboard",
    component: () => import("@/views/dashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  let auth_info = JSON.parse(localStorage.getItem('auth_info') || "{}")

  if(auth_info.data?.token && to.name === 'login'){
    return { name : 'dashboard'}
  }
});

export default router;
