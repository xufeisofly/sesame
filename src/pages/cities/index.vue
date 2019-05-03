<template>
  <div class="cities-wrap">
    <van-search
      :value="inputValue"
      placeholder="城市"
      show-action
    ></van-search>

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
</template>

<script>
import wx from '@/utils/wx'
import store from './store'

export default {
  data () {
    return {
      inputValue: null,
      positionCities: [
        { id: 1, name: '北京' }
      ],
      hotCities: [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' },
        { id: 3, name: '广州' }
      ],
      vacabCities: {
        B: [
          { id: 1, name: '北京' }
        ],
        S: [
          { id: 2, name: '上海' }
        ]
      },
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  mounted () {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.options
    console.log(options)
  },

  methods: {
    selectCity (cityName) {
      store.commit('saveFromCity', cityName)
      console.log(store.state.fromCity)

      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
.city-item {
  text-align: center;
  font-size: 14px;
  border: 0.5px solid #ccc;
  margin: 3px 5px;
  padding: 3px 0;
}

.city-bar {
  font-size: 10px;
  display: block;
  background-color: #ccc;
  margin: 0;
}

.city-list-item-wrapper {
  margin: 0, 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 0.1px #ccc solid;
}

.city-list-item {
  font-size: 14px;
}
</style>
