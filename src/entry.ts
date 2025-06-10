import { createApp } from "vue";
import watermark from "./components/water-mark.vue";
import type { IGaoMarkConfig } from './type'

const install = (app: ReturnType<typeof createApp>, options: IGaoMarkConfig) => {
  app.config.globalProperties._watermark_config = options || {}
  app.component('GaoWatermark', watermark);
}


export {
  watermark,
  install as default
}