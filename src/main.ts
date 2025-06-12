import { createApp } from 'vue'
import App from './App.vue'
import a from './entry'

const app = createApp(App)

app.use(a)


app.mount('#app')
