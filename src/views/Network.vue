<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-6 title d-flex justify-space-between align-center">
      จัดการข้อมูลเครือข่ายวิชาการ
      <v-btn color="success" rounded @click="saveNetwork">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </h1>

    <!-- ส่วน Banner -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ข้อมูล Banner</h3>
      <v-text-field
        v-model="network.bannerTitle"
        label="หัวข้อ Banner"
        variant="outlined"
        dense
        rounded
        prepend-icon="mdi-pencil"
        class="mb-4"
      ></v-text-field>
      <v-textarea
        v-model="network.bannerText"
        label="ข้อความ Banner"
        rows="3"
        variant="outlined"
        auto-grow
        rounded
        class="mb-4"
      ></v-textarea>
      <FileUploader v-model="network.bannerImage" label="รูปภาพ"></FileUploader>
    </v-card>

    <!-- ข้อความเกริ่นนำ -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">ข้อความเกริ่นนำ</h3>
      <v-textarea
        v-model="network.introText"
        label="ข้อความเกริ่นนำ"
        rows="4"
        variant="outlined"
        auto-grow
        rounded
      ></v-textarea>
    </v-card>

    <!-- เครือข่ายวิชาการ (Loop) -->
    <v-card class="mb-8 pa-6 text-card" elevation="4">
      <h3 class="section-title">เครือข่ายวิชาการ</h3>

      <v-row
        dense
        v-for="(item, index) in network.networks"
        :key="index"
        class="mb-6"
      >
        <v-col cols="12">
          <v-card class="pa-4 card-item" elevation="2">
            <h5 class="mb-4">เครือข่าย {{ index + 1 }}</h5>

            <v-row dense>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="item.region"
                  label="เลือกภาค"
                  :items="regions"
                  variant="outlined"
                  dense
                  rounded
                  prepend-icon="mdi-map-marker"
                />
              </v-col>

              <v-col cols="12" md="4">
                <FileUploader
                  v-model="item.image"
                  label="รูปภาพ"
                ></FileUploader>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="item.province"
                  label="จังหวัด / สถานที่ตั้ง"
                  variant="outlined"
                  dense
                  rounded
                  prepend-icon="mdi-map-marker"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <FileUploader
                  v-model="item.teamImage"
                  label="อัพโหลดรูปภาพคณะทำงาน"
                ></FileUploader>
              </v-col>
            </v-row>

            <!-- พื้นที่นำร่อง (Nested Loop) -->
            <v-card class="pa-3 mt-4" outlined>
              <h6 class="mb-3">พื้นที่นำร่อง</h6>
              <v-row
                dense
                v-for="(pilot, pIndex) in item.pilotAreas"
                :key="pIndex"
                class="mb-3"
              >
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="pilot.location"
                    label="จังหวัด / สถานที่ตั้ง"
                    variant="outlined"
                    dense
                    rounded
                    prepend-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <FileUploader
                    v-model="pilot.image"
                    label="อัพโหลดรูปภาพ"
                  ></FileUploader>
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="error"
                    text
                    rounded
                    @click="removePilotArea(index, pIndex)"
                  >
                    <v-icon start>mdi-delete</v-icon>
                    ลบพื้นที่
                  </v-btn>
                </v-col>
              </v-row>

              <v-btn color="primary" text rounded @click="addPilotArea(index)">
                <v-icon start>mdi-plus</v-icon>
                เพิ่มพื้นที่นำร่อง
              </v-btn>
            </v-card>

            <v-btn
              color="error"
              text
              rounded
              class="mt-3"
              @click="removeNetwork(index)"
            >
              <v-icon start>mdi-delete</v-icon>
              ลบเครือข่าย
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" rounded @click="addNetwork">
        <v-icon start>mdi-plus</v-icon>
        เพิ่มเครือข่าย
      </v-btn>
    </v-card>

    <!-- ปุ่มบันทึกทั้งหมด ด้านล่าง -->
    <div class="d-flex justify-end mt-4">
      <v-btn color="success" rounded @click="saveNetwork">
        <v-icon start>mdi-content-save</v-icon>
        บันทึกทั้งหมด
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAcademicNetwork, saveAcademicNetwork } from "@/api/academicNetwork";
import FileUploader from "@/components/FileUploader.vue";

const network = ref({
  bannerTitle: "",
  bannerText: "",
  bannerImage: null,
  introText: "",
  networks: [],
});

const regions = [
  "ภาคเหนือ",
  "ภาคตะวันออกเฉียงเหนือ",
  "ภาคกลาง",
  "ภาคตะวันออก",
  "ภาคตะวันตก",
  "ภาคใต้",
];

// โหลดข้อมูลจาก backend
onMounted(async () => {
  const res = await getAcademicNetwork();
  console.log("res.data", res.data);

  if (res && res.response_status === "SUCCESS" && res.data) {
    network.value = res.data;
  }
});

// ฟังก์ชันจัดการ loop
const addNetwork = () => {
  network.value.networks.push({
    region: "",
    image: null,
    province: "",
    teamImage: null,
    pilotAreas: [],
  });
};

const removeNetwork = (index) => {
  network.value.networks.splice(index, 1);
};

const addPilotArea = (networkIndex) => {
  network.value.networks[networkIndex].pilotAreas.push({
    location: "",
    image: null,
  });
};

const removePilotArea = (networkIndex, pilotIndex) => {
  network.value.networks[networkIndex].pilotAreas.splice(pilotIndex, 1);
};

// บันทึกข้อมูล
const saveNetwork = async () => {
  const res = await saveAcademicNetwork(network.value);
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

.card-item {
  border-radius: 12px;
  transition: 0.3s;
  background-color: #f9fafb;
}
.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
</style>
