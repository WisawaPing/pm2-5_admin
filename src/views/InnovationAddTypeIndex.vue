<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title">รายการประเภทนวัตกรรมการต่างๆ</h1>

    <v-row class="align-center mb-4">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="filterType"
          label="ค้นหาประเภท"
          :items="['ทั้งหมด', ...typesList]"
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
          @click="goToAdd"
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
            <v-avatar size="24" class="mr-1">
              <v-img :src="img" />
            </v-avatar>
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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getInnovationTypes, deleteInnovationType } from "@/api/innovationType";

const router = useRouter();

const innovationList = ref([]);
const filterType = ref("ทั้งหมด");
const typesList = ref([]);

const headers = [
  { title: "ประเภท", key: "type" },
  { title: "ชื่อหัวข้อ", key: "title" },
  { title: "สถานที่ตั้ง", key: "location" },
  // { title: "ภาพแผนผัง", key: "planImage" },
  // { title: "แกลลอรี่", key: "gallery" },
  // { title: "วีดีโอ", key: "videoLink" },
  { title: "Actions", key: "actions", sortable: false },
];

// ดึงข้อมูลจาก API
const fetchData = async () => {
  try {
    const res = await getInnovationTypes();
    if (res.response_status !== "ERROR") {
      innovationList.value = res.data.map((item) => ({
        ...item,
        gallery: Array.isArray(item.gallery) ? item.gallery : [],
      }));

      // สร้าง list ประเภทแบบ unique
      typesList.value = [...new Set(innovationList.value.map((i) => i.type))];
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
};

onMounted(fetchData);

// กรองรายการตามประเภท
const filteredList = computed(() => {
  if (filterType.value === "ทั้งหมด" || !filterType.value)
    return innovationList.value;
  return innovationList.value.filter((i) => i.type === filterType.value);
});

const goToAdd = () => {
  router.push("/innovation-add-type");
};

const goToEdit = (item, isView) => {
  router.push({
    path: "/innovation-add-type",
    query: { id: item.id, view: isView },
  });
};

const deleteInnovation = async (id) => {
  if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
    try {
      const res = await deleteInnovationType(id);
      if (res.response_status !== "ERROR") {
        innovationList.value = innovationList.value.filter((i) => i.id !== id);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  }
};
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
