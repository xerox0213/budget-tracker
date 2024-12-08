import DashboardPage from "@/pages/DashboardPage.vue";
import ManagePage from "@/pages/ManagePage.vue";
import TransactionsPage from "@/pages/TransactionsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { component: DashboardPage, name: "dashboard", path: "/" },
  { component: ManagePage, name: "manage", path: "/manage" },
  { component: TransactionsPage, name: "transactions", path: "/transactions" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
