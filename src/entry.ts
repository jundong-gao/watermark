import waterMark from "./components/water-mark.vue";
const install = (app: any) => {
  app.component('WaterMark', waterMark);
}

export {
  waterMark,
  install,
}

export default waterMark