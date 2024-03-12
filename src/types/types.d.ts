import { App } from 'vue';


declare module 'vue' {
  export interface GlobalComponents {
    GaoWatermark: typeof import('gao-watermark')['GaoWatermark']
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
export const GaoWatermark: typeof import('gao-watermark')['GaoWatermark']

export default {
  install
}