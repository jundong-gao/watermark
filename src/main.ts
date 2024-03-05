import { createApp } from 'vue'
import App from './App.vue'
import watermark, { GaoWatermark, IMarkConfig } from './entry'

let app = createApp(App)


console.log('GaoWatermark::::::::::::::::', GaoWatermark)

let config:IMarkConfig = {
  text: '测试',
}

console.log('config::::::::::::::::', config)

app.use(watermark, {
  color: 'deepskyblue',
  gap: 50,
  fontSize: 14,
  text: '测试水印'
})

app.mount('#app')
