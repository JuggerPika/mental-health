// main.js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router"; // ваш конфіг роутера

createApp(App).use(store).use(router).mount("#app");
