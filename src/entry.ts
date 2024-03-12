import { IMarkConfig } from "gao-watermark";
import GaoWatermark from "./components/water-mark.vue";
import { createApp } from "vue";
const install = (app: ReturnType<typeof createApp>, options: IMarkConfig) => {
  // 接收默认参数
  app.config.globalProperties._watermark_config = options
  app.component('GaoWatermark', GaoWatermark);
}

let component = {
  install
}


export {
  GaoWatermark,
  type IMarkConfig,
  component as default
}