import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import mitt from 'mitt';
import GlobalContainer from './components/GlobalContainer.vue';
import App from './App.vue';
import router from './permission';
import store from './store';

require('./util/mock/index');

const Mit = mitt();
const app = createApp(App);
for (const [key, component] of Object
  .entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('GlobalContainer', GlobalContainer).use(store).use(router).use(ElementPlus)
  .mount('#app');
app.config.globalProperties.$Bus = Mit;
