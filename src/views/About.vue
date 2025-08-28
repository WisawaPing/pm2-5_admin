<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลเกี่ยวกับเรา
      <!-- ปุ่มบันทึกมุมขวาบน -->
      <v-btn color="success" rounded @click="saveAll">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <!-- ส่วนที่ 1: ข้อความหัวข้อหลัก -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">ข้อความหัวข้อหลัก</h3>
      <v-textarea
        v-model="bannerText"
        rows="3"
        variant="outlined"
        auto-grow
        dense
        rounded
        class="mb-4"
        placeholder="พิมพ์ข้อความหัวข้อหลักที่นี่..."
      ></v-textarea>
    </v-card>

    <!-- ส่วนที่ 2: ข้อความรายละเอียดระยะที่ ... -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">ข้อความรายละเอียดระยะที่ ...</h3>
      <v-row dense>
        <v-col
          cols="12"
          sm="12"
          md="12"
          v-for="(item, index) in newsList"
          :key="index"
        >
          <v-card class="pa-4 card-item" elevation="4">
            <v-text-field
              v-model="item.location"
              label="ชื่อหัวข้อระยะที่ ..."
              variant="outlined"
              dense
              rounded
              class="mb-3"
            ></v-text-field>
            <v-textarea
              v-model="item.description"
              label="รายละเอียด"
              rows="3"
              variant="outlined"
              auto-grow
              dense
              rounded
              class="mb-3"
            ></v-textarea>
            <v-btn color="error" rounded text @click="removeNews(index)">
              <v-icon start>mdi-delete</v-icon>
              ลบ
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" rounded class="mt-4" @click="addNews">
        <v-icon start>mdi-plus</v-icon>
        เพิ่ม
      </v-btn>
    </v-card>

    <!-- ส่วนที่ 3: รูปภาพ Timeline -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">รูปภาพ Timeline</h3>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="pa-4 card-item" elevation="4">
            <v-file-input
              label="รูปภาพ Timeline"
              accept="image/*"
              variant="outlined"
              dense
              show-size
              prepend-icon="mdi-image"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>
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
import { getAbout, updateAbout } from "@/api/about";

const bannerText = ref("");
const newsList = ref([{ location: "", description: "" }]);
const timelineImage = ref("");

onMounted(async () => {
  const res = await getAbout();
  if (res.response_status === "SUCCESS") {
    const data = res.data;
    bannerText.value = data.bannerText || "";
    newsList.value = Array.isArray(data.newsList) ? data.newsList : [];
    timelineImage.value = data.timelineImage || "";
  } else {
    alert(res.message || "ไม่สามารถโหลดข้อมูลได้");
  }
});

const addNews = () => newsList.value.push({ location: "", description: "" });
const removeNews = (index) => newsList.value.splice(index, 1);

const saveAll = async () => {
  const res = await updateAbout({
    bannerText: bannerText.value,
    newsList: newsList.value,
    timelineImage: timelineImage.value,
  });

  if (res.response_status === "SUCCESS") {
    alert("✅ บันทึกข้อมูลทั้งหมดเรียบร้อย!");
  } else {
    alert(res.message || "บันทึกไม่สำเร็จ");
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
.banner-card {
  border-radius: 16px;
  background-color: #f5f7fa;
}

.card-item {
  border-radius: 12px;
  transition: 0.3s;
}
.card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
</style>
