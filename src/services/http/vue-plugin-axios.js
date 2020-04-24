import Vue from 'vue'
import VueAxios from 'vue-plugin-axios'
import axios from 'axios'

// Full configurations on: https://github.com/iliyaZelenko/vue-plugin-axios
Vue.use(VueAxios, {
  axios,
  config: {
    baseURL: process.env.VUE_APP_BASE_API,
  },
})
