<template>
  <div>
    <v-file-input
      v-model="files"
      :label="label"
      accept="image/*,application/pdf"
      prepend-icon="mdi-upload-multiple"
      outlined
      dense
      multiple
      :loading="loading"
      @change="uploadFiles"
    ></v-file-input>

    <!-- แสดง preview -->
    <v-row dense class="mt-3">
      <v-col
        v-for="(url, i) in uploadedUrls"
        :key="url"
        cols="6"
        sm="3"
        class="d-flex justify-center"
      >
        <v-card class="pa-2 card-item" elevation="1">
          <v-btn
            icon
            x-small
            class="delete-btn"
            variant="text"
            @click="removeFile(i)"
          >
            <v-icon size="16" color="red">mdi-close</v-icon>
          </v-btn>

          <v-img
            v-if="isImage(url)"
            :src="url"
            width="100%"
            height="100%"
            class="rounded"
            contain
          ></v-img>
          <div v-else class="file-name">{{ getFileName(url) }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: { type: String, default: "เลือกไฟล์" },
});

const emit = defineEmits(["update:modelValue"]);

const files = ref([]);
const uploadedUrls = ref([...props.modelValue]);
const loading = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    uploadedUrls.value = Array.isArray(val) ? [...val] : [];
  },
  { immediate: true }
);

const uploadFiles = async () => {
  if (!files.value || files.value.length === 0) return;

  loading.value = true;
  try {
    const urls = [];
    for (const f of files.value) {
      const formData = new FormData();
      formData.append("file", f);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/file`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.response_status === "SUCCESS") {
        urls.push(res.data.url);
      } else {
        console.error("Upload failed for file:", f.name);
      }
    }
    uploadedUrls.value.push(...urls);
    emit("update:modelValue", uploadedUrls.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
    files.value = [];
  }
};

const removeFile = (index) => {
  uploadedUrls.value.splice(index, 1);
  emit("update:modelValue", uploadedUrls.value);
};

const isImage = (url) => /\.(png|jpg|jpeg|gif)$/i.test(url);
const getFileName = (url) => url.split("/").pop();
</script>

<style scoped>
.card-item {
  width: 100%; /* เต็มความกว้างคอลัมน์ */
  height: 150px; /* ความสูงคงที่ ปรับตามต้องการ */
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.v-img.rounded {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ให้ภาพเต็ม card */
  border-radius: 8px;
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.file-name {
  font-size: 12px;
  text-align: center;
  word-break: break-all;
}
</style>
