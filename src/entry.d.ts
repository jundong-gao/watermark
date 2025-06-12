import type { App, DefineComponent } from 'vue';
import type { IGaoMarkConfig } from './type';


declare module 'gao-watermark' {
  const install: (app: App, options?:IGaoMarkConfig) => void
  const GaoWatermark: DefineComponent<IGaoMarkConfig>
  export { 
    install as default,
    GaoWatermark
  }
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    GaoWatermark: DefineComponent<IGaoMarkConfig>
  }
}