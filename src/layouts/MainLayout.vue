<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="#0d2a4f" dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>FAOFOON CMS</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="red" text @click="logout">Logout</v-btn>
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
          class="mt-2 rounded-lg"
          :class="$route.path === '/' ? 'active-item' : ''"
          @click="goTo('/')"
        >
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium">หน้าหลัก</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- เกี่ยวกับเรา -->
        <v-list-item
          class="mt-2 rounded-lg"
          :class="$route.path === '/About' ? 'active-item' : ''"
          @click="goTo('/About')"
        >
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium"
              >เกี่ยวกับเรา</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

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

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div v-bind="tooltipProps" @click="goTo('/innovation-pm25')">
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/innovation-pm25' ? 'active-item' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      นวัตกรรมการรับมือจากภัยฝุ่น PM2.5
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>นวัตกรรมการรับมือจากภัยฝุ่น PM2.5</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div v-bind="tooltipProps" @click="goTo('/innovation-community')">
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/innovation-community' ? 'active-item' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      นวัตกรรมการลดแหล่งกำเนิดในพื้นที่ชุมชน
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>นวัตกรรมการลดแหล่งกำเนิดในพื้นที่ชุมชน</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div
                v-bind="tooltipProps"
                @click="goTo('/innovation-forest-agriculture')"
              >
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/innovation-forest-agriculture'
                      ? 'active-item'
                      : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      นวัตกรรมลดแหล่งกำเนิดในพื้นที่ป่าไม้และพื้นที่การเกษตร
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>นวัตกรรมลดแหล่งกำเนิดในพื้นที่ป่าไม้และพื้นที่การเกษตร</span>
          </v-tooltip>
        </v-list-group>

        <!-- ชุมชนวิถีคาร์บอนต่ำ -->
        <v-list-group prepend-icon="mdi-newspaper-variant-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="rounded-lg">
              <v-list-item-content>
                <v-list-item-title class="font-medium"
                  >ชุมชนวิถีคาร์บอนต่ำ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div v-bind="tooltipProps" @click="goTo('/carbon-low-overview')">
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/carbon-low-overview' ? 'active-item' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium"
                      >ภาพรวม ชุมชนวิถีคาร์บอนต่ำ</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>ภาพรวม ชุมชนวิถีคาร์บอนต่ำ</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div
                v-bind="tooltipProps"
                @click="goTo('/carbon-low-forest-agriculture')"
              >
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/carbon-low-forest-agriculture'
                      ? 'active-item'
                      : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      โครงการด้านป่าไม้และการเกษตร (Forest/Agriculture)
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>โครงการด้านป่าไม้และการเกษตร (Forest/Agriculture)</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div v-bind="tooltipProps" @click="goTo('/carbon-low-waste')">
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/carbon-low-waste' ? 'active-item' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      โครงการด้านการจัดการของเสีย (Waste)
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>โครงการด้านการจัดการของเสีย (Waste)</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div v-bind="tooltipProps" @click="goTo('/carbon-low-energy')">
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/carbon-low-energy' ? 'active-item' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      โครงการด้านพลังงาน (Energy)
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>โครงการด้านพลังงาน (Energy)</span>
          </v-tooltip>
        </v-list-group>

        <!-- เครือข่ายวิชาการ -->
        <v-list-item
          class="rounded-lg"
          :class="$route.path === '/network' ? 'active-item' : ''"
          @click="goTo('/network')"
        >
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-network</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium"
              >เครือข่ายวิชาการ</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <!-- หลักสูตร Life Long Learning -->
        <v-list-group prepend-icon="mdi-newspaper-variant-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="rounded-lg">
              <v-list-item-content>
                <v-list-item-title class="font-medium"
                  >หลักสูตร Life Long Learning</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div
                v-bind="tooltipProps"
                @click="goTo('/life-long-learing-overview')"
              >
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/life-long-learing-overview'
                      ? 'active-item'
                      : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium"
                      >ภาพรวม Life Long Learning</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>ภาพรวม Life Long Learning</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template #activator="{ props: tooltipProps }">
              <div
                v-bind="tooltipProps"
                @click="goTo('/life-long-learing-course')"
              >
                <v-list-item
                  class="rounded-lg"
                  :class="
                    $route.path === '/life-long-learing-course'
                      ? 'active-item'
                      : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title class="truncate font-medium">
                      หลักสูตรของเรา
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
            <span>หลักสูตรของเรา</span>
          </v-tooltip>
        </v-list-group>

        <!-- ติดต่อเรา -->
        <v-list-item
          class="rounded-lg"
          :class="$route.path === '/contact' ? 'active-item' : ''"
          @click="goTo('/contact')"
        >
          <v-list-item-icon>
            <v-icon color="#0d2a4f">mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-medium">ติดต่อเรา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(true);
const isMobile = ref(false);
const router = useRouter();

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

const goTo = (path) => {
  router.push(path);
  if (isMobile.value) drawer.value = false; // ปิด drawer บนมือถืออัตโนมัติ
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.v-list-item:hover {
  background-color: #e3e8f0;
}
.active-item {
  background-color: #c9d1e8 !important;
}
.v-list-item-title {
  font-size: 14px;
}
@media (max-width: 1023px) {
  .v-navigation-drawer {
    z-index: 200 !important;
  }
}
</style>
