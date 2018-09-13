// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import iView from 'iview'
import router from './router'

import {get,post} from './utils'
import store from './store'

import './assets/iconfont/iconfont.css'
import 'iview/dist/styles/iview.css' 
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import VueParticles from 'vue-particles'


Vue.config.productionTip = false
// Vue.prototype.$axios=axios
Vue.prototype.$post=post
Vue.prototype.$get=get


Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueParticles)


/* eslint-disable no-new */
var app=new Vue({
  el: '#app',
  //router,

  store,

  render:h=>h(App)
})



