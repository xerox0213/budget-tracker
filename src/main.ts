import "./style.css";

import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "@/App.vue";
import { pinia } from "@/plugins/pinia.ts";
import { primeVueConfig } from "@/plugins/prime-vue.ts";

const app = createApp(App);

app.use(PrimeVue, primeVueConfig);
app.use(pinia);

app.mount("#app");
