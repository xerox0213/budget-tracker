import "./style.css";

import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "@/App.vue";
import { pinia } from "@/plugins/pinia.ts";
import { primeVueConfig } from "@/plugins/prime-vue.ts";
import { router } from "@/plugins/vue-router.ts";

const app = createApp(App);

app.use(PrimeVue, primeVueConfig);
app.use(pinia);
app.use(router);

app.mount("#app");
