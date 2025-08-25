<template>
  <v-container fluid>
    <h1 class="mb-4">Dashboard - เพิ่มข้อมูลหน้าหลัก</h1>

    <!-- ส่วนที่ 1: ข้อความ Banner -->
    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>ข้อความ Banner</h3>
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

    <!-- ส่วนที่ 2: ข้อความข้างแผนที่ -->
    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>ข้อความเครือข่ายการรู้-รับ-ปรับตัว</h3>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <div v-for="i in 4" :key="i" class="mb-4">
        <h5>ข้อความการ์ดที่ {{ i }}</h5>
        <v-text-field
          v-model="mapCards[i - 1].title"
          placeholder="หัวข้อ"
          variant="outlined"
          dense
          class="mb-2"
        ></v-text-field>
        <v-textarea
          v-model="mapCards[i - 1].text"
          placeholder="รายละเอียด"
          rows="3"
          variant="outlined"
          auto-grow
          dense
        ></v-textarea>
        <v-btn color="primary" class="mt-2" @click="saveCard(i - 1)">
          บันทึก
        </v-btn>
        <v-divider class="my-4" v-if="i < 4"></v-divider>
      </div>
    </v-card>

    <!-- ส่วนที่ 3: ข่าวสารและกิจกรรม -->
    <v-card class="mb-6 pa-4">
      <v-row>
        <v-col>
          <h3>ข่าวสารและกิจกรรม</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, index) in newsList"
          :key="index"
        >
          <v-card class="pa-3 mb-4">
            <v-text-field
              v-model="item.location"
              label="ชื่อพื้นที่"
              outlined
              dense
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="item.title"
              label="ชื่อกิจกรรม/ข่าว"
              outlined
              dense
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="item.description"
              label="รายละเอียด"
              rows="3"
              outlined
              dense
              class="mb-2"
            ></v-textarea>
            <v-file-input
              v-model="item.image"
              label="รูปภาพ"
              accept="image/*"
              outlined
              dense
              show-size
            ></v-file-input>
            <v-btn color="error" text class="mt-2" @click="removeNews(index)">
              ลบ
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" class="mt-2" @click="addNews">
        เพิ่มข่าว/กิจกรรม
      </v-btn>
      <v-btn color="success" class="mt-2 ml-2" @click="saveNews">
        บันทึกทั้งหมด
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// ส่วน Banner
const bannerText = ref("ข้อความเริ่มต้น Banner");

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
