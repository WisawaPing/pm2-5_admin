<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลหน้าหลัก
      <!-- ปุ่มบันทึกมุมขวาบน -->
      <v-btn color="success" rounded @click="saveAll">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <!-- ส่วนที่ 1: ข้อความ Banner -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">ข้อความ Banner</h3>
      <v-textarea
        v-model="bannerText"
        rows="3"
        variant="outlined"
        auto-grow
        dense
        rounded
        class="mb-4"
        placeholder="พิมพ์ข้อความ Banner ที่นี่..."
      ></v-textarea>
    </v-card>

    <!-- ส่วนที่ 2: ข้อความข้างแผนที่ -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">ข้อความเครือข่ายการรู้-รับ-ปรับตัว</h3>
      <v-divider class="my-6"></v-divider>

      <v-row dense>
        <v-col cols="12" md="6" v-for="(card, i) in mapCards" :key="i">
          <v-card class="pa-4 card-item" elevation="4">
            <h5 class="mb-3">การ์ด {{ i + 1 }}</h5>
            <v-text-field
              v-model="card.title"
              placeholder="หัวข้อ"
              variant="outlined"
              dense
              rounded
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="card.text"
              placeholder="รายละเอียด"
              rows="3"
              auto-grow
              dense
              rounded
              variant="outlined"
            ></v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- ส่วนที่ 3: ข่าวสารและกิจกรรม -->
    <v-card class="mb-8 pa-6 banner-card" elevation="6">
      <h3 class="section-title">ข่าวสารและกิจกรรม</h3>
      <v-row dense>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, index) in newsList"
          :key="index"
        >
          <v-card class="pa-4 card-item" elevation="4">
            <v-text-field
              v-model="item.location"
              label="ชื่อพื้นที่"
              variant="outlined"
              dense
              rounded
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="item.title"
              label="ชื่อกิจกรรม/ข่าว"
              variant="outlined"
              dense
              rounded
              class="mb-2"
            ></v-text-field>
            <v-file-input
              v-model="item.image"
              label="รูปภาพ"
              accept="image/*"
              variant="outlined"
              dense
              show-size
              prepend-icon="mdi-image"
            ></v-file-input>
            <v-btn
              color="error"
              rounded
              text
              class="mt-3"
              @click="removeNews(index)"
            >
              <v-icon start>mdi-delete</v-icon>
              ลบ
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" rounded class="mt-4" @click="addNews">
        <v-icon start>mdi-plus</v-icon>
        เพิ่มข่าว/กิจกรรม
      </v-btn>
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
import { ref } from "vue";

// Banner
const bannerText = ref("ข้อความเริ่มต้น Banner");

// ข้อความข้างแผนที่
const mapCards = ref([
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
]);

// ข่าวสารและกิจกรรม
const newsList = ref([{ title: "", description: "" }]);

// ฟังก์ชัน
const addNews = () => newsList.value.push({ title: "", description: "" });
const removeNews = (index) => newsList.value.splice(index, 1);

// ฟังก์ชันบันทึกทั้งหมด
const saveAll = () => {
  console.log("Banner:", bannerText.value);
  console.log("Map Cards:", mapCards.value);
  console.log("News List:", newsList.value);
  alert("บันทึกข้อมูลทั้งหมดเรียบร้อย!");
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

/* การ์ด modern */
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
