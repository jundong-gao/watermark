import waterMark from "./components/water-mark.vue";
const install = (app: any) => {
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