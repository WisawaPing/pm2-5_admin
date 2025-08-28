<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title">รายการหลักสูตร Life Long Learning</h1>

    <v-row class="align-center mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="ค้นหาหลักสูตร"
          variant="outlined"
          dense
          clearable
        />
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn
          color="primary"
          size="large"
          rounded
          prepend-icon="mdi-plus"
          @click="goToAdd"
        >
          เพิ่มหลักสูตร
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredCourses"
      item-key="id"
      dense
      class="innovation-table elevation-1 mt-4"
      :items-per-page="10"
    >
      <template #item.actions="{ item }">
        <v-row dense class="justify-center">
          <v-col cols="auto">
            <v-icon color="primary" @click="goToEdit(item.id, true)"
              >mdi-eye</v-icon
            >
          </v-col>
          <v-col cols="auto">
            <v-icon color="orange" @click="goToEdit(item.id, false)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="auto">
            <v-icon color="red" @click="removeCourse(item.id)"
              >mdi-delete</v-icon
            >
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCourses, deleteCourse } from "@/api/course";

const router = useRouter();
const courses = ref([]);
const search = ref("");

const headers = [
  { title: "ชื่อหลักสูตร", key: "name" },
  { title: "ระยะเวลา", key: "duration" },
  { title: "Actions", key: "actions", sortable: false },
];

const fetchCourses = async () => {
  try {
    const res = await getCourses();
    courses.value = res.data || [];
  } catch (err) {
    console.error("Error fetching courses:", err);
  }
};

const removeCourse = async (id) => {
  if (confirm("ต้องการลบหลักสูตรนี้หรือไม่?")) {
    await deleteCourse(id);
    await fetchCourses();
  }
};

const goToAdd = () => {
  router.push("/life-long-learning-course");
};

const goToEdit = (id, isView) => {
  router.push({
    path: "/life-long-learning-course",
    query: { id, view: isView },
  });
};

const filteredCourses = computed(() => {
  if (!search.value) return courses.value;
  return courses.value.filter((c) =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(fetchCourses);
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