<template>
  <v-container fluid>
    <h1 class="mb-6">จัดการข้อมูลติดต่อเรา</h1>

    <v-card class="pa-6 rounded-xl" outlined>
      <v-form>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="form.projectName"
              label="ชื่อโครงการ"
              variant="outlined"
              rounded
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.department"
              label="ภาควิชา / คณะ / มหาวิทยาลัย"
              variant="outlined"
              rounded
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.address"
              label="ที่อยู่"
              variant="outlined"
              rounded
              rows="3"
              auto-grow
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.phone"
              label="โทรศัพท์"
              variant="outlined"
              rounded
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="อีเมล"
              variant="outlined"
              rounded
            />
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <div class="text-end">
          <v-btn
            color="primary"
            prepend-icon="mdi-content-save"
            class="rounded-lg px-6"
            @click="saveForm"
          >
            บันทึกข้อมูล
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  projectName:
    "โครงการด้านการรู้รับปรับตัวจากภัยฝุ่น PM2.5 (PM2.5 Resilience Project)",
  department: "ภาควิชาภูมิศาสตร์ คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่",
  address: "239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง เชียงใหม่ 50200",
  phone: "053-943562",
  email: "SSSCMU123@GMAIL.COM",
});

const saveForm = () => {
  console.log("บันทึกข้อมูล", form.value);
  // TODO: call API บันทึกข้อมูล
};
</script>
