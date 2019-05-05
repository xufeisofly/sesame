<template>
  <div class="cities-wrap">
    <van-search
      :value="inputValue"
      placeholder="城市/拼音/首字母"
      @focus="onFocusSearch"
      @cancel="onCancelSearch"
      @search="onSearch"
      show-action
    ></van-search>

    <div class="default-list" v-if="!showSearchList">
      <div id="position" class="city-block">
        <p class="city-bar">定位</p>
        <div class="city-list">
          <van-row>
            <van-col span="6" v-for="city in positionCities" :key="city.id">
              <div class="city-item"
                   @click="selectCity(city.name)">
                {{ city.name }}
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div id="hot-city" class="city-block">
        <p class="city-bar">热门城市</p>
        <div class="city-list">
          <van-row>
            <van-col span="6" v-for="city in hotCities" :key="city.id">
              <div class="city-item"
                   @click="selectCity(city.name)">
                {{ city.name }}
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div id="city-list" class="city-list">
        <div class="cabulary-list" v-for="(letter, indexL) in letters" :key="letter">
          <div class="letter-label">
            <p class="city-bar">{{ letter }}</p>
          </div>
          <div class="city-list-item-wrapper" v-for="(city, indexC) in vacabCities[letter]" :key="city.id">
            <p class="city-list-item" @click="selectCity(city.name)">{{ city.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="search-list" v-else>
      <div class="city-list">
        <div class="city-list-item-wrapper" v-for="(city, indexC) in searchCities" :key="city.id">
          <p class="city-list-item" @click="selectCity(city.name)">{{ city.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from '@/utils/wx'
import store from './store'
import { getCities } from '@/utils/api'

export default {
  data () {
    return {
      inputValue: null,
      showSearchList: false,
      nextLetter: 'A',
      curLetter: 'A',
      positionCities: [
        { id: 1, name: '北京' }
      ],
      hotCities: [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' },
        { id: 3, name: '广州' }
      ],
      vacabCities: {},
      searchCities: [],
      letters: ['A']
    }
  },
  onLoad () {
    this.showSearchList = false
    this.getCityList()
  },
  onReachBottom () {
    this.getCityList()
  },

  methods: {
    selectCity (cityName) {
      store.commit('saveFromCity', cityName)
      wx.navigateBack({
        delta: 1
      })
    },
    getCityList () {
      if (this.nextLetter === 'Z') {
        return
      }
      getCities({ letter: this.nextLetter }).then(res => {
        this.vacabCities = {...this.vacabCities, ...res.data.cities}
        this.nextLetter = res.data.next_letter
        this.letters.push(res.data.next_letter)

        // reload data if no data returned
        if (res.data.has_data === false) {
          this.getCityList()
        }
      })
    },
    onCancelSearch () {
      this.showSearchList = false
    },
    onFocusSearch () {
      this.showSearchList = true
    },
    onSearch (e) {
      getCities({ q: e.mp.detail }).then(res => {
        this.searchCities = res.data.search_cities
      })
    }
  }
}
</script>

<style scoped>
.city-item {
  text-align: center;
  font-size: 14px;
  border: 0.5px solid #f2f2f2;
  margin: 5px 5px;
  padding: 3px 0;
  color: #666;
}

.city-bar {
  font-size: 10px;
  display: block;
  background-color: #f2f2f2;
  margin: 0;
}

.city-list-item-wrapper {
  margin: 0, 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 0.1px #f2f2f2 solid;
}

.city-list-item {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}
</style>
