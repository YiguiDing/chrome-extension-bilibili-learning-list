import { createApp } from 'vue'
import App from './ContentScript.vue'
import '@layui/layui-vue/lib/index.css'
import '@layui/layer-vue/lib/index.css'
import 'element-plus/dist/index.css'
import './script'

const app = createApp(App)
const div = document.createElement('div')
document.body.appendChild(div)
app.mount(div)
