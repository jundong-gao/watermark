import { createApp } from "vue";
import GaoWatermark from "./components/water-mark.vue";
import type { IGaoMarkConfig } from './type'

const install = (app: ReturnType<typeof createApp>, options: IGaoMarkConfig) => {
  app.config.globalProperties._watermark_config = options || {}
  app.component('GaoWatermark', GaoWatermark);
}


export {
  GaoWatermark,
  type IGaoMarkConfig,
  install as default
}