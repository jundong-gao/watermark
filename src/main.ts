import { createApp } from 'vue'
import App from './App.vue'
import a from './entry'

console.log('a::::::::::::::::', a)

let app = createApp(App)


app.use(a, {
  color: 'deepskyblue',
  gap: 50,
  fontSize: 10,
  text: '水印'
})

app.mount('#app')
