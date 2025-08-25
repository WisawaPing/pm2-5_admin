<template>
  <v-container fluid>
    <h1 class="mb-4">จัดการข้อมูลเกี่ยวกับเรา</h1>

    <!-- ส่วนที่ 1: ข้อความหัวข้อหลัก -->
    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>ข้อความหัวข้อหลัก</h3>
        </v-col>
      </v-row>
      <v-textarea
        v-model="bannerText"
        rows="3"
        variant="outlined"
        auto-grow
      ></v-textarea>
      <v-btn color="primary" class="mt-2" @click="saveBanner"> บันทึก </v-btn>
    </v-card>

    <!-- ส่วนที่ 2: ข้อความรายละเอียดระยะที่ ... -->
    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>ข้อความรายละเอียดระยะที่ ...</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          v-for="(item, index) in newsList"
          :key="index"
        >
          <v-card class="pa-3 mb-4">
            <v-text-field
              v-model="item.location"
              label="ชื่อหัวข้อระยะที่ ..."
              variant="outlined"
              dense
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="item.description"
              label="รายละเอียด"
              rows="3"
              variant="outlined"
              dense
              class="mb-2"
            ></v-textarea>
            <!-- <v-file-input
              v-model="item.image"
              label="รูปภาพ"
              accept="image/*"
              outlined
              dense
              show-size
            ></v-file-input> -->
            <v-btn color="error" text class="mt-2" @click="removeNews(index)">
              ลบ
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" class="mt-2" @click="addNews"> เพิ่ม </v-btn>
      <v-btn color="success" class="mt-2 ml-2" @click="saveNews">
        บันทึกทั้งหมด
      </v-btn>
    </v-card>

    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>รูปภาพ Timeline</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-3 mb-4">
            <v-file-input
              label="รูปภาพ Timeline"
              accept="image/*"
              variant="outlined"
              dense
              show-size
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// ส่วน Banner
const bannerText = ref("");

// ส่วน ข้อความข้างแผนที่
const mapCards = ref([
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
  { title: "", text: "" },
]);

// ส่วน ข่าวสารและกิจกรรม
const newsList = ref([{ title: "", description: "" }]);

// ฟังก์ชัน
const saveBanner = () => {
  console.log("บันทึก Banner:", bannerText.value);
  alert("บันทึกข้อความ Banner เรียบร้อย");
};

const saveCard = (index) => {
  console.log(`บันทึกการ์ด ${index + 1}:`, mapCards.value[index]);
  alert(`บันทึกการ์ด ${index + 1} เรียบร้อย`);
};

const addNews = () => {
  newsList.value.push({ title: "", description: "" });
};

const removeNews = (index) => {
  newsList.value.splice(index, 1);
};

const saveNews = () => {
  console.log("บันทึกข่าวสารทั้งหมด:", newsList.value);
  alert("บันทึกข่าวสารเรียบร้อย");
};
</script>

<style scoped>
h1 {
  color: #0d2a4f;
  font-weight: 600;
}
h3 {
  color: #0d2a4f;
  font-weight: 500;
}
</style>
