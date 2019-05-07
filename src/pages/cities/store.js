import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fromCity: null,
    longitude: null,
    latitude: null,
    curCityName: null
  },
  mutations: {
    saveFromCity: (state, fromCity) => {
      state.fromCity = fromCity
    },
    savePosition: (state, longitude, latitude) => {
      state.longitude = longitude
      state.latitude = latitude
    },
    saveCurCityName: (state, curCityName) => {
      state.curCityName = curCityName
    }
  }
})

export default store
