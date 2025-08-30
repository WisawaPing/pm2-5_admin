<template>
  <div>
    <v-file-input
      v-model="file"
      :label="label"
      accept="image/*,application/pdf"
      prepend-icon="mdi-upload"
      outlined
      dense
      :loading="loading"
      @change="uploadFile"
    ></v-file-input>

    <!-- แสดง preview ถ้าเป็นรูป -->
    <v-img v-if="imageUrl" :src="imageUrl" class="card-image" cover></v-img>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: [String, null],
  label: { type: String, default: "เลือกไฟล์" },
});

const emit = defineEmits(["update:modelValue"]);

const file = ref(null);
const imageUrl = ref("");
const loading = ref(false);

// watch modelValue จาก parent
watch(
  () => props.modelValue,
  (val) => {
    imageUrl.value = val;
  },
  { immediate: true }
);

const uploadFile = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);

  loading.value = true;
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/upload/file`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.response_status === "SUCCESS") {
      imageUrl.value = res.data.url;
      emit("update:modelValue", res.data.url);
    } else {
      imageUrl.value = "";
      emit("update:modelValue", null);
    }
  } catch (err) {
    console.error(err);
    imageUrl.value = "";
    emit("update:modelValue", null);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
}
</style>
