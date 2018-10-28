import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
]
const router = new VueRouter({
    routes
})
import config from 'config'
const configMixin = Vue.mixin({
  created: function () {
    this.$config = config
  }
});

new Vue({
  el: '#app',
  configMixin,
  router,
  render: h => h(App)
})
