import { App } from 'vue';
import GaoWatermark from '../components/water-mark.vue'


declare module 'vue' {
  export interface GlobalComponents {
    GaoWatermark: typeof GaoWatermark
  }
}

export interface IMarkConfig {
  [key: string]: any;
  text?: string,
  fontSize?: number,
  color?: string,
  gap?: number | Array<number>,
  zIndex?: number,
}

export const install: (app: App, option?: IMarkConfig) => void;

export default {
  install
}