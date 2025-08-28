<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลประเภทชุมชนวิถีคาร์บอนต่ำ
      <v-btn v-if="!isView" color="success" rounded @click="saveCommunity">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <!-- เลือกประเภท -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">เลือกประเภท</h3>
      <v-autocomplete
        v-model="community.type"
        label="เลือกประเภท"
        variant="outlined"
        :items="[
          'โครงการด้านป่าไม้และการเกษตร (Forest/Agriculture)',
          'โครงการด้านการจัดการของเสีย (Waste)',
          'โครงการด้านพลังงาน (Energy)',
        ]"
        dense
        rounded
        prepend-icon="mdi-pencil"
        :disabled="isView"
      ></v-autocomplete>
    </v-card>

    <!-- ข้อมูลชุมชน -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ข้อมูลชุมชน</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.title"
            label="ชื่อหัวข้อ"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-pencil"
            :disabled="isView"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.location"
            label="สถานที่ตั้ง"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-map-marker"
            :disabled="isView"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.carbonStorage"
            label="การกักเก็บคาร์บอน"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-leaf"
            :disabled="isView"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.carbonReduction"
            label="การลดการปล่อยก๊าซคาร์บอน"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-factory"
            :disabled="isView"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="community.context"
            label="บริบทพื้นที่"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
            :disabled="isView"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>

    <!-- ผังการทำงาน -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ผังการทำงาน</h3>
      <v-file-input
        v-model="community.workflowImage"
        label="อัปโหลดผังการทำงาน"
        accept="image/*"
        variant="outlined"
        dense
        show-size
        prepend-icon="mdi-image"
        :disabled="isView"
      ></v-file-input>
      <v-img
        v-if="
          community.workflowImage && typeof community.workflowImage === 'string'
        "
        :src="community.workflowImage"
        max-width="300"
        class="mt-2"
      />
    </v-card>

    <!-- ภาพกิจกรรม -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ภาพกิจกรรม</h3>
      <v-file-input
        v-model="community.activityImages"
        label="อัปโหลดภาพกิจกรรมหลายรูป"
        accept="image/*"
        multiple
        variant="outlined"
        dense
        show-size
        prepend-icon="mdi-image-multiple"
        :disabled="isView"
      ></v-file-input>
      <v-row v-if="community.activityImages.length > 0" class="mt-2">
        <v-col
          v-for="(img, i) in community.activityImages"
          :key="i"
          cols="auto"
        >
          <v-img :src="img" max-width="100" max-height="100" />
        </v-col>
      </v-row>
    </v-card>

    <!-- ปุ่มบันทึกล่าง -->
    <div class="d-flex justify-end mt-4" v-if="!isView">
      <v-btn color="success" rounded @click="saveCommunity">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  createCommunityType,
  getCommunityTypeById,
  updateCommunityType,
} from "@/api/communityType";

const router = useRouter();
const route = useRoute();

const community = ref({
  type: "",
  title: "",
  location: "",
  carbonStorage: "",
  carbonReduction: "",
  context: "",
  workflowImage: null,
  activityImages: [],
});

const isView = ref(false);
const isEdit = ref(false);

onMounted(async () => {
  const id = route.query.id;
  isView.value = route.query.view === "true";
  isEdit.value = !!id;

  if (id) {
    try {
      const res = await getCommunityTypeById(id);
      Object.assign(community.value, res.data);
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถดึงข้อมูลได้");
    }
  }
});

const saveCommunity = async () => {
  try {
    if (isEdit.value) {
      await updateCommunityType(route.query.id, community.value);
    } else {
      await createCommunityType(community.value);
    }
    alert("✅ บันทึกข้อมูลทั้งหมดเรียบร้อย!");
    router.push("/carbon-low-add-type-index");
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
};
</script>

<style scoped>
.title {
  color: #0d2a4f;
  font-weight: 700;
}

.text-card {
  border-radius: 16px;
  transition: 0.3s;
  background: linear-gradient(135deg, #ffffff, #f5f7fa);
}

.text-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
}

.section-title {
  color: #0d2a4f;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
