<template>
  <v-container fluid>
    <h1 class="mb-4">จัดการข้อมูลหลักสูตรของเรา Life Long Learning</h1>

    <v-form>
      <!-- ชื่อหลักสูตร -->
      <v-text-field
        v-model="course.name"
        label="ชื่อหลักสูตร"
        variant="outlined"
        rounded
        class="mb-4"
      />

      <!-- อัปโหลดภาพหลักสูตร -->
      <v-file-input
        v-model="course.image"
        label="อัปโหลดภาพหลักสูตร"
        accept="image/*"
        variant="outlined"
        class="mb-4"
        prepend-icon="mdi-image"
      />

      <!-- คำอธิบาย -->
      <v-textarea
        v-model="course.description"
        label="คำอธิบายหลักสูตร"
        variant="outlined"
        rounded
        class="mb-4"
      />

      <!-- ระยะเวลาเรียน -->
      <v-text-field
        v-model="course.duration"
        label="ระยะเวลาเรียน (รวม)"
        variant="outlined"
        rounded
        class="mb-4"
      />

      <!-- หัวข้อบทเรียน -->
      <h2 class="text-h6 mb-2">หัวข้อของบทเรียน</h2>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="(lesson, lIndex) in course.lessons"
          :key="lIndex"
        >
          <v-expansion-panel-title>
            {{ lesson.title || `หัวข้อบทเรียนที่ ${lIndex + 1}` }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
              v-model="lesson.title"
              label="ชื่อหัวข้อบทเรียน"
              variant="outlined"
              rounded
              class="mb-4"
            />

            <!-- เนื้อหาในบทเรียน -->
            <h3 class="text-subtitle-1 mb-2">เนื้อหา</h3>
            <v-card
              v-for="(content, cIndex) in lesson.contents"
              :key="cIndex"
              class="mb-3 pa-3"
              variant="outlined"
              rounded="xl"
            >
              <v-text-field
                v-model="content.detailTitle"
                label="หัวข้อรายละเอียด"
                variant="outlined"
                rounded
                class="mb-3"
              />
              <v-textarea
                v-model="content.detail"
                label="รายละเอียด"
                variant="outlined"
                rounded
                class="mb-3"
              />
              <v-text-field
                v-model="content.duration"
                label="ระยะเวลา"
                variant="outlined"
                rounded
                class="mb-3"
              />
              <v-text-field
                v-model="content.speaker"
                label="ผู้บรรยาย"
                variant="outlined"
                rounded
                class="mb-3"
              />
              <v-text-field
                v-model="content.speakerGroup"
                label="คณะของผู้บรรยาย"
                variant="outlined"
                rounded
                class="mb-3"
              />

              <div class="text-right">
                <v-btn
                  color="error"
                  variant="tonal"
                  rounded
                  @click="removeContent(lIndex, cIndex)"
                >
                  ลบเนื้อหา
                </v-btn>
              </div>
            </v-card>

            <v-btn
              color="primary"
              variant="tonal"
              rounded
              prepend-icon="mdi-plus"
              @click="addContent(lIndex)"
            >
              เพิ่มเนื้อหา
            </v-btn>

            <div class="text-right mt-4">
              <v-btn
                color="error"
                variant="flat"
                rounded
                @click="removeLesson(lIndex)"
              >
                ลบหัวข้อบทเรียน
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn
        color="primary"
        variant="flat"
        rounded
        prepend-icon="mdi-plus"
        class="mt-4"
        @click="addLesson"
      >
        เพิ่มหัวข้อบทเรียน
      </v-btn>

      <!-- เกณฑ์การวัดผล -->
      <v-textarea
        v-model="course.evaluation"
        label="เกณฑ์การวัดผล"
        variant="outlined"
        rounded
        class="mt-6"
      />

      <!-- ลิ้งค์ดาวน์โหลด -->
      <v-text-field
        v-model="course.downloadLink"
        label="ลิ้งค์ดาวน์โหลดคู่มือประกอบหลักสูตร"
        variant="outlined"
        rounded
        class="mt-4"
        prepend-icon="mdi-link"
      />

      <!-- Save Button -->
      <div class="text-center mt-6">
        <v-btn color="success" rounded size="large">
          บันทึกข้อมูลหลักสูตร
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const course = ref({
  name: "",
  image: null,
  description: "",
  duration: "",
  lessons: [],
  evaluation: "",
  downloadLink: "",
});

const addLesson = () => {
  course.value.lessons.push({
    title: "",
    contents: [],
  });
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
</script>
