<template>
  <v-container>
    <h1>จัดการบทความ</h1>
    <v-btn color="primary" class="mb-4" @click="addPost">+ เพิ่มบทความ</v-btn>

    <v-table>
      <thead>
        <tr>
          <th>หัวข้อ</th>
          <th>ผู้เขียน</th>
          <th>วันที่</th>
          <th>การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ post.date }}</td>
          <td>
            <v-btn size="small" color="warning" @click="editPost(post)"
              >แก้ไข</v-btn
            >
            <v-btn size="small" color="error" @click="deletePost(post.id)"
              >ลบ</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const posts = ref([
  { id: 1, title: "โพสต์แรก", author: "Admin", date: "2025-08-26" },
  { id: 2, title: "โพสต์สอง", author: "User", date: "2025-08-25" },
]);

const addPost = () => {
  posts.value.push({
    id: Date.now(),
    title: "โพสต์ใหม่",
    author: "Admin",
    date: new Date().toISOString().slice(0, 10),
  });
};

const editPost = (post) => {
  alert("แก้ไข: " + post.title);
};

const deletePost = (id) => {
  posts.value = posts.value.filter((p) => p.id !== id);
};
</script>
