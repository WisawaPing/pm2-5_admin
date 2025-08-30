<template>
  <v-container fluid>
    <h1 class="mb-4">
      {{ isView ? "ดูข้อมูลหลักสูตร" : "จัดการข้อมูลหลักสูตร" }}
    </h1>

    <div class="text-end mb-6">
      <v-btn rounded @click="router.go(-1)">กลับ</v-btn>
      &emsp;
      <v-btn v-if="!isView" color="success" rounded @click="saveCourse"
        >บันทึกข้อมูล</v-btn
      >
    </div>

    <v-form>
      <v-card class="mb-8 pa-6 text-card" elevation="4">
        <h3 class="section-title">รูปภาพหลักสูตร</h3>
        <FileUploader v-model="course.image" label="รูปภาพ"></FileUploader>
      </v-card>

      <v-text-field
        v-model="course.name"
        label="ชื่อหลักสูตร"
        :readonly="isView"
        class="mb-4"
        variant="outlined"
        rounded
      />
      <v-textarea
        v-model="course.description"
        label="คำอธิบายหลักสูตร"
        :readonly="isView"
        class="mb-4"
        variant="outlined"
        rounded
      />
      <!-- <v-text-field
        v-model="course.duration"
        label="ระยะเวลาเรียน (รวม)"
        :readonly="isView"
        class="mb-4"
        variant="outlined"
        rounded
      /> -->

      <h2 class="text-h6 mb-2">หัวข้อของบทเรียน</h2>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="(lesson, lIndex) in course.lessons"
          :key="lIndex"
        >
          <v-expansion-panel-title>{{
            lesson.title || `หัวข้อบทเรียนที่ ${lIndex + 1}`
          }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
              v-model="lesson.title"
              label="ชื่อหัวข้อบทเรียน"
              :readonly="isView"
              class="mb-4"
              variant="outlined"
              rounded
            />

            <h3 class="text-subtitle-1 mb-2">เนื้อหา</h3>
            <v-card
              v-for="(content, cIndex) in lesson.contents"
              :key="cIndex"
              class="mb-3 pa-3"
            >
              <v-text-field
                v-model="content.detailTitle"
                label="หัวข้อรายละเอียด"
                :readonly="isView"
                class="mb-3"
                variant="outlined"
                rounded
              />
              <v-textarea
                v-model="content.detail"
                label="รายละเอียด"
                :readonly="isView"
                class="mb-3"
                variant="outlined"
                rounded
              />
              <v-text-field
                v-model="content.duration"
                label="ระยะเวลา"
                :readonly="isView"
                class="mb-3"
                variant="outlined"
                rounded
                type="number"
              />
              <v-text-field
                v-model="content.speaker"
                label="ผู้บรรยาย"
                :readonly="isView"
                class="mb-3"
                variant="outlined"
                rounded
              />
              <v-text-field
                v-model="content.speakerGroup"
                label="คณะของผู้บรรยาย"
                :readonly="isView"
                class="mb-3"
                variant="outlined"
                rounded
              />

              <div v-if="!isView" class="text-right">
                <v-btn color="error" @click="removeContent(lIndex, cIndex)"
                  >ลบเนื้อหา</v-btn
                >
              </div>
            </v-card>

            <v-btn v-if="!isView" color="primary" @click="addContent(lIndex)"
              >เพิ่มเนื้อหา</v-btn
            >
            <div v-if="!isView" class="text-right mt-4">
              <v-btn color="error" @click="removeLesson(lIndex)"
                >ลบหัวข้อบทเรียน</v-btn
              >
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn v-if="!isView" color="primary" @click="addLesson" class="mt-4"
        >เพิ่มหัวข้อบทเรียน</v-btn
      >

      <v-textarea
        v-model="course.evaluation"
        label="เกณฑ์การวัดผล"
        :readonly="isView"
        class="mt-6"
        variant="outlined"
        rounded
      />
      <v-text-field
        v-model="course.downloadLink"
        label="ลิ้งค์ดาวน์โหลดคู่มือประกอบหลักสูตร"
        :readonly="isView"
        class="mt-4"
        variant="outlined"
        rounded
      />

      <div class="text-end mt-6">
        <v-btn rounded @click="router.go(-1)">กลับ</v-btn>
        &emsp;
        <v-btn v-if="!isView" color="success" rounded @click="saveCourse"
          >บันทึกข้อมูล</v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCourseById, createCourse, updateCourse } from "@/api/course.js";
import FileUploader from "@/components/FileUploader.vue";

const route = useRoute();
const router = useRouter();

const course = ref({
  image: "",
  name: "",
  description: "",
  duration: "",
  lessons: [],
  evaluation: "",
  downloadLink: "",
});

const isView = ref(false);
const courseId = route.query.id;

onMounted(async () => {
  if (courseId) {
    const res = await getCourseById(courseId);
    course.value = res.data;
    isView.value = route.query.view === "true";
  }
});

const addLesson = () => {
  course.value.lessons.push({ title: "", contents: [] });
};

const removeLesson = (index) => {
  course.value.lessons.splice(index, 1);
};

const addContent = (lessonIndex) => {
  course.value.lessons[lessonIndex].contents.push({
    detailTitle: "",
    detail: "",
    duration: "",
    speaker: "",
    speakerGroup: "",
  });
};

const removeContent = (lessonIndex, contentIndex) => {
  course.value.lessons[lessonIndex].contents.splice(contentIndex, 1);
};

const saveCourse = async () => {
  try {
    // ส่ง course.value ทั้ง object โดยตรง
    if (courseId) {
      await updateCourse(courseId, course.value);
    } else {
      await createCourse(course.value);
    }
    alert("✅ บันทึกข้อมูลทั้งหมดเรียบร้อย!");
    router.push("/life-long-learning-course-index");
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  }
};
</script>
