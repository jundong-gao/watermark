import { IMarkConfig } from "gao-watermark";
import waterMark from "./components/water-mark.vue";
const install = (app: any, options: IMarkConfig) => {
  console.log('接收到的默认参数为::::::::::::::::', options)
  app.component('WaterMark', waterMark);
}

let component = {
  waterMark,
  install
}


export {
  waterMark,
  install,
}

export default component