<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="#0d2a4f" dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none" />
      <v-app-bar-title>FAOFOON CMS</v-app-bar-title>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!isMobile"
      :temporary="isMobile"
      width="260"
      color="#ffffff"
      class="pa-2"
    >
      <v-list nav dense>
        <!-- หน้าหลัก -->
        <v-list-item
          link
          :to="'/'"
          class="mt-2 rounded-lg"
          :class="$route.path === '/' ? 'active-item' : ''"
        >
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium">หน้าหลัก</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- เกี่ยวกับเรา -->
        <v-list-group prepend-icon="mdi-information-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="rounded-lg">
              <v-list-item-content>
                <v-list-item-title class="font-medium"
                  >เกี่ยวกับเรา</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>ภาพรวม</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>ทีมงาน</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>พันธมิตร</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- นวัตกรรมโดดเด่น -->
        <v-list-group prepend-icon="mdi-lightbulb-on-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="rounded-lg">
              <v-list-item-content>
                <v-list-item-title class="font-medium"
                  >นวัตกรรมโดดเด่น</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>โครงการ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>รางวัล</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- ข่าวสาร -->
        <v-list-group prepend-icon="mdi-newspaper-variant-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="rounded-lg">
              <v-list-item-content>
                <v-list-item-title class="font-medium"
                  >ข่าวสาร</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>ประกาศ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/'" class="rounded-lg">
            <v-list-item-content>
              <v-list-item-title>บทความ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- ติดต่อเรา -->
        <v-list-item link :to="'/'" class="rounded-lg">
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium">ติดต่อเรา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const drawer = ref(true);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024; // breakpoint ตามต้องการ
  if (isMobile.value) drawer.value = false;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
</script>

<style scoped>
/* hover สีอ่อนน้ำเงิน */
.v-list-item:hover {
  background-color: #e3e8f0;
}

/* highlight current menu */
.active-item {
  background-color: #c9d1e8 !important;
}

/* font ปรับให้อ่านง่าย */
.v-list-item-title {
  font-size: 14px;
}

/* สำหรับ mobile ให้ sidebar overlay */
@media (max-width: 1023px) {
  .v-navigation-drawer {
    z-index: 200 !important;
  }
}
</style>
