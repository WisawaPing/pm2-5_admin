<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลประเภทนวัตกรรมการต่างๆ
    </h1>

    <div class="text-end mb-6">
      <v-btn rounded @click="router.go(-1)">กลับ</v-btn>
      &emsp;
      <v-btn v-if="!isView" color="success" rounded @click="saveInnovation">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกข้อมูล
      </v-btn>
    </div>

    <!-- ส่วนเลือกประเภท -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">เลือกประเภท</h3>
      <v-autocomplete
        v-model="innovation.type"
        label="เลือกประเภท"
        variant="outlined"
        :items="[
          'นวัตกรรมการรับมือจากภัยฝุ่น PM2.5',
          'นวัตกรรมการลดแหล่งกำเนิดในพื้นที่ชุมชน',
          'นวัตกรรมลดแหล่งกำเนิดในพื้นที่ป่าไม้และพื้นที่การเกษตร',
        ]"
        dense
        rounded
        prepend-icon="mdi-pencil"
        :disabled="isView"
      />
    </v-card>

    <!-- ข้อมูลหัวข้อหลัก -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ข้อมูลหัวข้อหลัก</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="innovation.title"
            label="ชื่อหัวข้อ"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-pencil"
            :disabled="isView"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="innovation.location"
            label="สถานที่ตั้ง"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-map-marker"
            :disabled="isView"
          />
        </v-col>
        <v-col cols="12">
          <!-- ใช้ FileUploader สำหรับ planImage -->
          <FileUploader
            v-model="innovation.planImage"
            label="ภาพแผนผัง"
            :disabled="isView"
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- รายละเอียดพื้นที่และกระบวนการ -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">รายละเอียดพื้นที่และกระบวนการ</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.context"
            label="บริบทพื้นที่"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
            :disabled="isView"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.process"
            label="กระบวนการ (ผัง)"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
            :disabled="isView"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.results"
            label="ผลลัพธ์ที่เกิดขึ้น"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
            :disabled="isView"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.training"
            label="หลักสูตรการอบรม"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
            :disabled="isView"
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- แกลลอรี่ (MultiFileUploader) -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">แกลลอรี่</h3>
      <MultiFileUploader
        v-model="innovation.gallery"
        label="อัพโหลดแกลลอรี่"
        :disabled="isView"
      />

      <v-row v-if="innovation.gallery.length > 0" class="mt-2">
        <v-col
          v-for="(img, i) in innovation.gallery"
          :key="'preview-' + i"
          cols="auto"
        >
          <v-img :src="img" max-width="100" max-height="100" />
        </v-col>
      </v-row>
    </v-card>

    <!-- วีดีโอแนะนำ -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">วีดีโอแนะนำศูนย์เรียนรู้</h3>
      <v-text-field
        v-model="innovation.videoLink"
        label="วางลิงก์วีดีโอ"
        variant="outlined"
        dense
        rounded
        prepend-icon="mdi-video"
        :disabled="isView"
      />
    </v-card>

    <!-- ปุ่มบันทึกมุมขวาล่าง -->
    <div class="text-end mt-6">
      <v-btn rounded @click="router.go(-1)">กลับ</v-btn>
      &emsp;
      <v-btn v-if="!isView" color="success" rounded @click="saveInnovation">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกข้อมูล
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FileUploader from "@/components/FileUploader.vue";
import MultiFileUploader from "@/components/MultiFileUploader.vue";
import {
  createInnovationType,
  getInnovationTypeById,
  updateInnovationType,
} from "@/api/innovationType";

const router = useRouter();
const route = useRoute();

const innovation = ref({
  type: "",
  title: "",
  location: "",
  planImage: "",
  context: "",
  process: "",
  results: "",
  training: "",
  gallery: [],
  videoLink: "",
});

const isView = ref(false);
const isEdit = ref(false);

onMounted(async () => {
  const id = route.query.id;
  isView.value = route.query.view === "true";
  isEdit.value = !!id;

  if (id) {
    try {
      const res = await getInnovationTypeById(id);
      const data = res.data;

      if (typeof data.gallery === "string") {
        data.gallery = JSON.parse(data.gallery);
      }

      Object.assign(innovation.value, data);
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถดึงข้อมูลได้");
    }
  }
});

const saveInnovation = async () => {
  try {
    const payload = { ...innovation.value };
    if (isEdit.value) {
      await updateInnovationType(route.query.id, payload);
    } else {
      await createInnovationType(payload);
    }
    alert("บันทึกข้อมูลเรียบร้อย!");
    router.push("/innovation-add-type-index");
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการบันทึก");
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
