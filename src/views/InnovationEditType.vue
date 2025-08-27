<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลนวัตกรรมการรับมือจากภัยฝุ่น PM2.5
      <!-- ปุ่มบันทึกมุมขวาบน -->
      <v-btn color="success" rounded @click="saveInnovation">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

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
      ></v-autocomplete>
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
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="innovation.location"
            label="สถานที่ตั้ง"
            variant="outlined"
            dense
            rounded
            prepend-icon="mdi-map-marker"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="innovation.planImage"
            label="ภาพแผนผัง"
            accept="image/*"
            variant="outlined"
            dense
            show-size
            prepend-icon="mdi-image"
          ></v-file-input>
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
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.process"
            label="กระบวนการ (ผัง)"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.results"
            label="ผลลัพธ์ที่เกิดขึ้น"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="innovation.training"
            label="หลักสูตรการอบรม"
            rows="4"
            variant="outlined"
            auto-grow
            rounded
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>

    <!-- แกลลอรี่ -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">แกลลอรี่</h3>
      <v-file-input
        v-model="innovation.gallery"
        label="อัพโหลดรูปภาพหลายรูป"
        accept="image/*"
        multiple
        variant="outlined"
        dense
        show-size
        prepend-icon="mdi-image-multiple"
      ></v-file-input>
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
      ></v-text-field>
    </v-card>

    <!-- ปุ่มบันทึกมุมขวาล่าง -->
    <div class="d-flex justify-end mt-4">
      <v-btn color="success" rounded @click="saveInnovation">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const innovation = ref({
  type: "",
  title: "",
  location: "",
  planImage: null,
  context: "",
  process: "",
  results: "",
  training: "",
  gallery: [],
  videoLink: "",
});

const saveInnovation = () => {
  console.log("บันทึกนวัตกรรม PM2.5:", innovation.value);
  alert("บันทึกข้อมูลเรียบร้อย!");
  router.push("/innovation-add-type-index");
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
