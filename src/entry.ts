import { createApp } from "vue";
import GaoWatermark from "./components/water-mark.vue";
import { IMarkConfig } from './type'

const install = (app: ReturnType<typeof createApp>, options: IMarkConfig) => {
  app.config.globalProperties._watermark_config = options || {}
  app.component('GaoWatermark', GaoWatermark);
}


export {
  GaoWatermark,
  type IMarkConfig,
  install as default
}