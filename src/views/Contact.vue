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
import { ref, onMounted } from "vue";
import { getContact, updateContact } from "@/api/contact";

const form = ref({
  projectName: "",
  department: "",
  address: "",
  phone: "",
  email: "",
});

const loadContact = async () => {
  const res = await getContact();
  if (res.response_status === "SUCCESS") {
    form.value = { ...form.value, ...res.data };
  } else {
    console.error("Load contact error:", res.message);
  }
};

onMounted(loadContact);

const saveForm = async () => {
  try {
    const res = await updateContact(form.value);
    if (res.response_status === "SUCCESS") {
      alert("บันทึกข้อมูลเรียบร้อย");
    } else {
      alert(res.message || "บันทึกไม่สำเร็จ");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  }
};
</script>
