import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import data from './modules/data'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    data,
    user,
  },
  getters
})

export default store
