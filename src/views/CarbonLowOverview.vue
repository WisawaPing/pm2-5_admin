<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลภาพรวม ชุมชนวิถีคาร์บอนต่ำ
      <v-btn color="success" rounded @click="saveCommunity">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <!-- ส่วนรูปภาพ Banner -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">รูปภาพ Banner</h3>
      <v-file-input
        v-model="bannerImage"
        label="เลือกภาพ Banner"
        accept="image/*"
        variant="outlined"
        dense
        show-size
        prepend-icon="mdi-image"
      ></v-file-input>
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

    <!-- ภาพรวมโครงการ -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ภาพรวมทั้งหมดของโครงการ</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.carbonStorage"
            label="กักเก็บคาร์บอน"
            variant="outlined"
            dense
            rounded
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="community.carbonEmission"
            label="การปล่อยคาร์บอน"
            variant="outlined"
            dense
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <!-- ลิ้งก์ดาวน์โหลด -->
    <v-card class="pa-6 text-card" elevation="4">
      <h3 class="section-title">จัดการลิ้งก์ดาวน์โหลด</h3>
      <v-row dense>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="community.lessLink"
            label="ลิ้งค์คู่มือโครงการ LESS"
            variant="outlined"
            dense
            rounded
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="community.webLink"
            label="Web อบก"
            variant="outlined"
            dense
            rounded
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="community.excelLink"
            label="วิธีคำนวณ Excel"
            variant="outlined"
            dense
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <!-- ปุ่มบันทึกมุมขวาล่าง -->
    <div class="d-flex justify-end mt-4">
      <v-btn color="success" rounded @click="saveCommunity">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const bannerText = ref("");
const bannerImage = ref(null);

const community = ref({
  carbonStorage: "",
  carbonEmission: "",
  lessLink: "",
  webLink: "",
  excelLink: "",
});

const saveCommunity = () => {
  console.log("บันทึกข้อมูลชุมชน:", {
    bannerText: bannerText.value,
    bannerImage: bannerImage.value,
    ...community.value,
  });
  alert("บันทึกข้อมูลเรียบร้อย!");
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
