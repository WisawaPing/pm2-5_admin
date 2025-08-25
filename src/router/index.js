import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  // {
  //   path: "/about-overview",
  //   name: "AboutOverview",
  //   component: () => import("@/views/AboutOverview.vue"),
  // },
  // {
  //   path: "/about-team",
  //   name: "AboutTeam",
  //   component: () => import("@/views/AboutTeam.vue"),
  // },
  // {
  //   path: "/innovation-projects",
  //   name: "InnovationProjects",
  //   component: () => import("@/views/InnovationProjects.vue"),
  // },
  // {
  //   path: "/innovation-awards",
  //   name: "InnovationAwards",
  //   component: () => import("@/views/InnovationAwards.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
