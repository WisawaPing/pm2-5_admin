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
      // หน้าหลัก
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },

      // เกี่ยวกับเรา
      {
        path: "about",
        name: "About",
        component: () => import("@/views/About.vue"),
      },

      // นวัตกรรมโดดเด่น
      {
        path: "innovation-banner",
        name: "InnovationBanner",
        component: () => import("@/views/InnovationBanner.vue"),
      },
      {
        path: "innovation-add-type-index",
        name: "InnovationAddTypeIndex",
        component: () => import("@/views/InnovationAddTypeIndex.vue"),
      },
      {
        path: "innovation-add-type",
        name: "InnovationAddType",
        component: () => import("@/views/InnovationAddType.vue"),
      },
      {
        path: "innovation-edit-type",
        name: "InnovationEditType",
        component: () => import("@/views/InnovationEditType.vue"),
      },

      // ชุมชนวิถีคาร์บอนต่ำ
      {
        path: "carbon-low-overview",
        name: "CarbonLowOverview",
        component: () => import("@/views/CarbonLowOverview.vue"),
      },
      {
        path: "carbon-low-add-type-index",
        name: "CarbonLowAddTypeIndex",
        component: () => import("@/views/CarbonLowAddTypeIndex.vue"),
      },
      {
        path: "carbon-low-add-type",
        name: "CarbonLowAddType",
        component: () => import("@/views/CarbonLowAddType.vue"),
      },
      {
        path: "carbon-low-edit-type",
        name: "CarbonLowEditType",
        component: () => import("@/views/CarbonLowEditType.vue"),
      },

      // เครือข่าย
      {
        path: "network",
        name: "Network",
        component: () => import("@/views/Network.vue"),
      },

      // life-long-learning
      {
        path: "life-long-learing-overview",
        name: "LifeLongLerningOverview",
        component: () => import("@/views/LifeLongLerningOverview.vue"),
      },
      {
        path: "life-long-learing-course-index",
        name: "LifeLongLerningCourseIndex",
        component: () => import("@/views/LifeLongLerningCourseIndex.vue"),
      },
      {
        path: "life-long-learing-course",
        name: "LifeLongLerningCourse",
        component: () => import("@/views/LifeLongLerningCourse.vue"),
      },
      {
        path: "life-long-learing-course-edit",
        name: "LifeLongLerningCourseEdit",
        component: () => import("@/views/LifeLongLerningCourseEdit.vue"),
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
