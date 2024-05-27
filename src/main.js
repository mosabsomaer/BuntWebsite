import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import DropZone from 'dropzone-vue';

// optionally import default styles
import 'dropzone-vue/dist/dropzone-vue.common.css';


createApp(App)
  .use(DropZone)
  .use(createPinia())
  .use(router)
  .mount('#app')

