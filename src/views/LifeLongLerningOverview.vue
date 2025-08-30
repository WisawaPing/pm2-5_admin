<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูล Banner
      <!-- ปุ่มบันทึกมุมขวาบน -->
      <v-btn color="success" rounded @click="saveAll">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">รูปภาพ Banner</h3>
      <FileUploader v-model="bannerImage" label="รูปภาพ"></FileUploader>
    </v-card>

    <!-- ข้อความ Banner -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ข้อความ Banner</h3>
      <v-textarea
        v-model="bannerText"
        variant="outlined"
        auto-grow
        rounded
        placeholder="พิมพ์ข้อความ Banner ที่นี่..."
      ></v-textarea>
    </v-card>

    <!-- ปุ่มบันทึกมุมขวาล่าง -->
    <div class="d-flex justify-end mt-4">
      <v-btn color="success" rounded @click="saveAll">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getLifeLongLearningBanner,
  saveLifeLongLearningBanner,
} from "@/api/lifeLongLearningBanner";
import FileUploader from "@/components/FileUploader.vue";

const bannerText = ref("");
const bannerImage = ref(null);

// โหลดข้อมูลเมื่อเปิดหน้า
onMounted(async () => {
  const res = await getLifeLongLearningBanner();
  if (res && res.id) {
    bannerText.value = res.bannerText || "";
    bannerImage.value = res.bannerImage || null;
  }
});

// ฟังก์ชันบันทึกทั้งหมด
const saveAll = async () => {
  const payload = {
    bannerText: bannerText.value,
    bannerImage: bannerImage.value,
  };

  const res = await saveLifeLongLearningBanner(payload);

  if (res.response_status === "ERROR") {
    alert("❌ บันทึกไม่สำเร็จ: " + res.message);
  } else {
    alert("✅ บันทึกข้อมูลทั้งหมดเรียบร้อย!");
  }
};
</script>

<style scoped>
.title {
  color: #0d2a4f;
  font-weight: 700;
}

.section-title {
  color: #0d2a4f;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* Card modern */
.banner-card,
.text-card {
  border-radius: 16px;
  transition: 0.3s;
  background: linear-gradient(135deg, #ffffff, #f5f7fa);
}

.banner-card:hover,
.text-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
}
</style>
