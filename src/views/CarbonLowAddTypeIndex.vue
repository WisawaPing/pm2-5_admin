<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title">รายการประเภทชุมชนวิถีคาร์บอนต่ำ</h1>

    <v-row class="align-center mb-4">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="filterType"
          label="ค้นหาประเภท"
          :items="['ทั้งหมด', ...types]"
          variant="outlined"
          dense
          clearable
        />
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn
          color="primary"
          rounded
          size="large"
          prepend-icon="mdi-plus"
          class="px-6"
          @click="goToAdd()"
        >
          เพิ่ม
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredList"
      item-key="id"
      class="innovation-table elevation-1 mt-4"
      dense
      :items-per-page="10"
    >
      <!-- Actions -->
      <template #item.actions="{ item }">
        <v-row class="justify-center" dense>
          <v-col cols="auto">
            <v-icon
              color="primary"
              class="action-icon"
              @click="goToEdit(item, true)"
            >
              mdi-eye
            </v-icon>
          </v-col>
          <v-col cols="auto">
            <v-icon
              color="orange"
              class="action-icon"
              @click="goToEdit(item, false)"
            >
              mdi-pencil
            </v-icon>
          </v-col>
          <v-col cols="auto">
            <v-icon
              color="red"
              class="action-icon"
              @click="deleteCommunity(item.id)"
            >
              mdi-delete
            </v-icon>
          </v-col>
        </v-row>
      </template>

      <!-- แสดง activityImages เป็น chip -->
      <template #item.activityImages="{ item }">
        <v-chip-group class="d-flex flex-wrap" column>
          <v-chip
            v-for="(img, i) in item.activityImages"
            :key="i"
            small
            outlined
            color="blue-grey lighten-4"
            class="ma-1"
          >
            ภาพ {{ i + 1 }}
          </v-chip>
        </v-chip-group>
      </template>

      <!-- แสดง workflowImage -->
      <template #item.workflowImage="{ item }">
        <v-avatar size="36">
          <v-img :src="item.workflowImage" />
        </v-avatar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getCommunityTypes, deleteCommunityType } from "@/api/communityType";

const router = useRouter();
const communityList = ref([]);
const filterType = ref("");
const types = [
  "โครงการด้านป่าไม้และการเกษตร (Forest/Agriculture)",
  "โครงการด้านการจัดการของเสีย (Waste)",
  "โครงการด้านพลังงาน (Energy)",
];

const headers = [
  { title: "ประเภท", key: "type" },
  { title: "ชื่อหัวข้อ", key: "title" },
  { title: "สถานที่ตั้ง", key: "location" },
  // { title: "ผังการทำงาน", key: "workflowImage" },
  // { title: "ภาพกิจกรรม", key: "activityImages" },
  { title: "Actions", key: "actions", sortable: false },
];

const fetchCommunityList = async () => {
  const res = await getCommunityTypes();
  if (res.response_status !== "ERROR") {
    communityList.value = res.data || [];
  } else {
    alert(res.message);
  }
};

const deleteCommunity = async (id) => {
  if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
    const res = await deleteCommunityType(id);
    if (res.response_status !== "ERROR") {
      communityList.value = communityList.value.filter((i) => i.id !== id);
    } else {
      alert(res.message);
    }
  }
};

const goToAdd = () => {
  router.push("/carbon-low-add-type");
};

const goToEdit = (item, isView) => {
  router.push({
    path: "/carbon-low-add-type",
    query: { id: item.id, view: isView },
  });
};

onMounted(fetchCommunityList);

const filteredList = computed(() => {
  if (!filterType.value || filterType.value === "ทั้งหมด")
    return communityList.value;
  return communityList.value.filter((c) => c.type === filterType.value);
});
</script>

<style scoped>
.title {
  color: #0d2a4f;
  font-weight: 700;
}

.innovation-table {
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
}

.innovation-table th {
  background-color: #f0f4f8;
  color: #0d2a4f;
  font-weight: 600;
}

.innovation-table tr:hover {
  background-color: #f5f7fa;
}

.action-icon {
  cursor: pointer;
  font-size: 20px;
  transition: 0.2s;
}

.action-icon:hover {
  transform: scale(1.2);
}
</style>
