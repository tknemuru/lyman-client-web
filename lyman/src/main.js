import Vue from 'vue'
import App from './App.vue'
import config from 'config'
const configMixin = Vue.mixin({
  created: function () {
    this.$config = config
  }
});

new Vue({
  el: '#app',
  configMixin,
  render: h => h(App)
})
