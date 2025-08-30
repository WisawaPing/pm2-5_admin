import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";

const vuetify = createVuetify({ components, directives });

const app = createApp(App);

// ✅ สร้าง Pinia instance
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(vuetify);
app.mount("#app");

// 👉 export pinia เพื่อให้ใช้ใน apiClient ได้ (กรณีใช้วิธีที่ 2)
export { pinia };
