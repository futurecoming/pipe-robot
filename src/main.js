import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VideoPlayer from 'vue-video-player'
import 'babel-polyfill'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VideoPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
