<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลภาพรวม ชุมชนวิถีคาร์บอนต่ำ
      <v-btn color="success" rounded @click="saveCommunity">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกข้อมูล
      </v-btn>
    </h1>

    <!-- ส่วนรูปภาพ Banner -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">รูปภาพ Banner</h3>
      <FileUploader v-model="bannerImage" label="รูปภาพ"></FileUploader>
    </v-card>

    <!-- ข้อความ Banner -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">หัวข้อ Banner</h3>
      <v-text-field
        v-model="bannerTitle"
        variant="outlined"
        rounded
        placeholder="พิมพ์หัวข้อ Banner ที่นี่..."
      ></v-text-field>
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
        บันทึกข้อมูล
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getCommunityOverview,
  updateCommunityOverview,
} from "@/api/communityOverview";
import FileUploader from "@/components/FileUploader.vue";

const bannerTitle = ref("");
const bannerText = ref("");
const bannerImage = ref("");

const community = ref({
  carbonStorage: "",
  carbonEmission: "",
  lessLink: "",
  webLink: "",
  excelLink: "",
  id: null, // id ของ record
});

// โหลดข้อมูล
const load = async () => {
  const res = await getCommunityOverview();
  console.log(res);

  if (res.response_status === "SUCCESS") {
    const d = res.data || {};
    bannerTitle.value = d.bannerTitle || "";
    bannerText.value = d.bannerText || "";
    bannerImage.value = d.bannerImage || "";
    community.value = {
      id: d.id || null,
      carbonStorage: d.carbonStorage || "",
      carbonEmission: d.carbonEmission || "",
      lessLink: d.lessLink || "",
      webLink: d.webLink || "",
      excelLink: d.excelLink || "",
    };
  } else {
    console.error("Load community overview error:", res.message);
  }
};

onMounted(load);

// บันทึกข้อมูล
const saveCommunity = async () => {
  const payload = {
    bannerTitle: bannerTitle.value,
    bannerText: bannerText.value,
    bannerImage: bannerImage.value,
    carbonStorage: community.value.carbonStorage,
    carbonEmission: community.value.carbonEmission,
    lessLink: community.value.lessLink,
    webLink: community.value.webLink,
    excelLink: community.value.excelLink,
  };

  try {
    const res = await updateCommunityOverview(payload); // ใช้ update แค่ record เดียว
    if (res.response_status === "SUCCESS") {
      community.value.id = res.data.id; // เก็บ id เผื่อใช้ในอนาคต
      alert("✅ บันทึกข้อมูลทั้งหมดเรียบร้อย!");
    } else {
      alert(res.message || "บันทึกไม่สำเร็จ");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
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
