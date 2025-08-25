<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card>
              <v-card-title class="text-h5">เข้าสู่ระบบ</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="username" label="Username" required />
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-btn type="submit" color="primary" class="mt-4" block>
                    เข้าสู่ระบบ
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  // ❌ ส่วน API คอมเมนต์ไว้ก่อน
  /*
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      router.push("/"); // login สำเร็จ
    } else {
      alert("Username หรือ Password ไม่ถูกต้อง");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  }
  */

  // ✅ Mock login แบบ admin / 1234
  if (username.value === "admin" && password.value === "1234") {
    localStorage.setItem("token", "mock-token"); // เก็บ token ชั่วคราว
    router.push("/"); // login สำเร็จ
  } else {
    alert("Username หรือ Password ไม่ถูกต้อง");
  }
};
</script>

