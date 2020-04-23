import Vue from 'vue'
import VueRest from 'vue-rest'

Vue.use(VueRest, {
  axiosOptions: {
    baseURL: process.env.VUE_APP_BASE_API,
  },
})
