<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title">รายการประเภทชุมชนวิถีคาร์บอนต่ำ</h1>

    <v-row class="align-center mb-4">
      <v-col cols="12" md="6">
        <v-autocomplete
          label="ค้นหาประเภท"
          :items="[
            'ทั้งหมด',
            'โครงการด้านป่าไม้และการเกษตร (Forest/Agriculture)',
            'โครงการด้านการจัดการของเสีย (Waste)',
            'โครงการด้านพลังงาน (Energy)',
          ]"
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

    <!-- ตารางแบบ clean พร้อม pagination -->
    <v-data-table
      :headers="headers"
      :items="innovationList"
      item-key="id"
      class="innovation-table elevation-1 mt-4"
      dense
      :items-per-page="10"
    >
      <!-- Actions: icon-only -->
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
              @click="deleteInnovation(item.id)"
            >
              mdi-delete
            </v-icon>
          </v-col>
        </v-row>
      </template>

      <!-- แสดง gallery เป็น chip -->
      <template #item.gallery="{ item }">
        <v-chip-group class="d-flex flex-wrap" column>
          <v-chip
            v-for="(img, i) in item.gallery"
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

      <!-- แสดง planImage -->
      <template #item.planImage="{ item }">
        <v-avatar size="36">
          <v-img :src="item.planImage" />
        </v-avatar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const innovationList = ref([
  {
    id: 1,
    type: "นวัตกรรมการรับมือจากภัยฝุ่น PM2.5",
    title: "โครงการทดสอบ 1",
    location: "เชียงใหม่",
    planImage: "https://via.placeholder.com/150",
    gallery: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/101",
    ],
    videoLink: "https://youtube.com/example1",
  },
]);

const headers = [
  { title: "ประเภท", key: "type" },
  { title: "ชื่อหัวข้อ", key: "title" },
  { title: "สถานที่ตั้ง", key: "location" },
  { title: "ภาพแผนผัง", key: "planImage" },
  { title: "แกลลอรี่", key: "gallery" },
  { title: "วีดีโอ", key: "videoLink" },
  { title: "Actions", key: "actions", sortable: false },
];

const deleteInnovation = (id) => {
  if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
    innovationList.value = innovationList.value.filter((i) => i.id !== id);
  }
};

const goToAdd = async () => {
  router.push("/carbon-low-add-type");
};

const goToEdit = async (item, isView) => {
  router.push({
    path: "/carbon-low-edit-type",
    query: { id: item.id, view: isView },
  });
};
</script>

<style scoped>
.title {
  color: #0d2a4f;
  font-weight: 700;
}

/* ตาราง clean */
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
