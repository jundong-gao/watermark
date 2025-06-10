import type { App, Component, Directive} from 'vue';
import type { IGaoMarkConfig } from './type'


declare module 'gao-scroll-animate' {
  const install: (app: App) => void
  const watermark: Component<IGaoMarkConfig>
  export { 
    install as default,
    watermark
  }
}