import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fromCity: null
  },
  mutations: {
    saveFromCity: (state, fromCity) => {
      state.fromCity = fromCity
    }
  }
})

export default store
