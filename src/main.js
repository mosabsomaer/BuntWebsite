import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import DropZone from "dropzone-vue";
import VueGoodTablePlugin from "vue-good-table-next";
import store from "./store/store";
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'

// import the styles
import "dropzone-vue/dist/dropzone-vue.common.css";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App)
  .use(DropZone)
  .use(createPinia())
  .use(router)
  .use(store)
  .use(VueGoodTablePlugin)
  .use(VueRecaptchaPlugin, {
    v2SiteKey: '6LeMeBwqAAAAAAfcKcOw_MRAqeFT38-EPCOoun6l'  })
  .mount("#app");
