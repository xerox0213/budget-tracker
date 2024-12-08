import { pinia } from "@/pinia.ts";
import { router } from "@/router.ts";

import "./assets/index.css";

import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
