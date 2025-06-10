import type { App, Directive} from 'vue';


declare module 'gao-scroll-animate' {
  const install: (app: App) => void
  export { install as default }
}