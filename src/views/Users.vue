<template>
  <v-container>
    <h1>จัดการผู้ใช้</h1>
    <v-table>
      <thead>
        <tr>
          <th>ชื่อผู้ใช้</th>
          <th>อีเมล</th>
          <th>สิทธิ์</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  { id: 1, name: "Admin", email: "admin@example.com", role: "ผู้ดูแลระบบ" },
  { id: 2, name: "User1", email: "user1@example.com", role: "ผู้ใช้ทั่วไป" },
]);
</script>
