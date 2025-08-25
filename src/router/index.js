import { createRouter, createWebHistory } from "vue-router";

// Layout
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "innovation-pm25",
        name: "InnovationPM25",
        component: () => import("@/views/InnovationPM25.vue"),
      },
      {
        path: "innovation-community",
        name: "InnovationCommunity",
        component: () => import("@/views/InnovationCommunity.vue"),
      },
      {
        path: "innovation-forest-agriculture",
        name: "InnovationForestAgriculture",
        component: () => import("@/views/InnovationForestAgriculture.vue"),
      },
      // ชุมชนวิถีคาร์บอนต่ำ
      {
        path: "carbon-low-overview",
        name: "CarbonLowOverview",
        component: () => import("@/views/CarbonLowOverview.vue"),
      },
      {
        path: "carbon-low-forest-agriculture",
        name: "CarbonLowForestAgriculture",
        component: () => import("@/views/CarbonLowForestAgriculture.vue"),
      },
      {
        path: "carbon-low-waste",
        name: "CarbonLowWaste",
        component: () => import("@/views/CarbonLowWaste.vue"),
      },
      {
        path: "carbon-low-energy",
        name: "CarbonLowEnergy",
        component: () => import("@/views/CarbonLowEnergy.vue"),
      },
      {
        path: "network",
        name: "Network",
        component: () => import("@/views/Network.vue"),
      },
      {
        path: "life-long-learing-overview",
        name: "LifeLongLerningOverview",
        component: () => import("@/views/LifeLongLerningOverview.vue"),
      },
      {
        path: "life-long-learing-course",
        name: "LifeLongLerningCourse",
        component: () => import("@/views/LifeLongLerningCourse.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ตรวจสอบ login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
