import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

import DashboardPage from "@/pages/DashboardPage.vue";
import ManagePage from "@/pages/ManagePage.vue";
import TransactionsPage from "@/pages/TransactionsPage.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "dashboard",
    path: "/",
    component: DashboardPage,
  },
  {
    name: "transactions",
    path: "/transactions",
    component: TransactionsPage,
  },
  {
    name: "manage",
    path: "/manage",
    component: ManagePage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
