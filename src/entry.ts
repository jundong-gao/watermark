import { type App } from "vue";
import watermark from "./components/water-mark.vue";
import type { IGaoMarkConfig } from './type';

const install = (app: App, options?: IGaoMarkConfig) => {
  app.config.globalProperties._watermark_config = options || {}
  app.component('GaoWatermark', watermark);
}


export {
  watermark as GaoWatermark,
  install as default
}