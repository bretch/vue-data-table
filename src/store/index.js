import Vue from 'vue'
import Vuex from 'vuex'
import payments from './data.json'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments
  },
  actions,
  mutations
})
