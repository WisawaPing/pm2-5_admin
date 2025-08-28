<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center" fluid>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-6 rounded-lg elevation-6">
            <v-card-title class="text-h5 justify-center"
              >เข้าสู่ระบบ</v-card-title
            >
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="username"
                  label="Username"
                  variant="outlined"
                  rounded
                  prepend-icon="mdi-account"
                  dense
                  required
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  rounded
                  prepend-icon="mdi-lock"
                  dense
                  required
                  class="mt-4"
                />
                <v-btn
                  type="submit"
                  color="primary"
                  class="mt-6"
                  block
                  rounded
                  elevation="2"
                >
                  เข้าสู่ระบบ
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/api/user";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  const data = await loginUser(username.value, password.value);

  if (data.response_status === "SUCCESS") {
    localStorage.setItem("token", data.data.token); // เก็บ JWT
    router.push("/"); // login สำเร็จ
  } else {
    alert(data.message || "Username หรือ Password ไม่ถูกต้อง");
  }
};
</script>

<style scoped>
.rounded-lg {
  border-radius: 16px;
}

.v-card-title {
  color: #0d2a4f;
  font-weight: 600;
}

.v-btn {
  font-weight: 600;
}
</style>
