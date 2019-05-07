<template>
  <div id="home">
    <van-cell-group>
      <van-field :value="fromCity"
                 label="出发城市"
                 @click="goCities">
      </van-field>
    </van-cell-group>
    <div class="mpvue-picer">
      <van-field :value="duration"
                 label="时长"
                 disabled
                 @click="showPicker">
      </van-field>
      <mpvue-picker ref="mpvuePicker"
                    mode="selector"
                    @onChange="onChange"
                    @onConfirm="onConfirm"
                    @onCancel="onCancel"
                    :pickerValueDefault="pickerValueDefault"
                    :pickerValueArray="pickerValueArray">
      </mpvue-picker>
    </div>
    <div id="search">
      <van-button type="default"
                  plain
                  hairline
                  :loading="loading"
                  size="large"
                  @click="onSearchBtnClick"
                  loading-text="搜索中...">
        搜索
      </van-button>
    </div>
    <div id="trip-list">
      <van-cell-group>
        <van-cell v-for="trip in trips"
                  :key="trip.id"
                  :title="trip.to_city"
                  :value="trip.duration_min + ' 分钟'"
                  size="large"
                  :url="'/pages/pois/main?city=' + trip.to_city"
                  link-type="navigateTo"
                  :is-link="true"
                  arrow-direction="right"
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import wx from '@/utils/wx'
import store from '@/pages/cities/store'
import mpvuePicker from 'mpvue-picker'
import { getTrips, getCityByPosition } from '@/utils/api'

export default {
  components: {
    mpvuePicker
  },

  data () {
    return {
      duration: null,
      loading: false,
      pickerValueDefault: [1],
      pickerValueArray: [
        {
          label: '1小时',
          value: 1
        },
        {
          label: '2小时',
          value: 2
        },
        {
          label: '3小时',
          value: 3
        },
        {
          label: '4小时',
          value: 4
        }
      ],
      trips: []
    }
  },
  computed: {
    fromCity () {
      return store.state.fromCity
    }
  },

  methods: {
    goCities () {
      wx.navigateTo({
        url: '../cities/main?name=fuck'
      })
    },
    showPicker () {
      this.$refs.mpvuePicker.show()
    },
    onChange () {
      console.log('onChange')
    },
    onConfirm (e) {
      console.log('onConfirm')
      console.log(e.label)
      this.duration = e.label
    },
    onCancel () {
      console.log('onCancel')
    },
    onSearchBtnClick () {
      this.loading = true
      this.getTripList()
    },
    getTripList () {
      getTrips({ fromCity: this.fromCity, duration: this.duration, offset: 0 }).then((res) => {
        this.trips = res.data.trips
        this.loading = false
      }).catch((e) => {
        this.loading = false
      })
    },
    loadPosition () {
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          store.commit('savePosition', res.longitude, res.latitude)
          that.loadCityByPosition(res.longitude, res.latitude)
        },
        fail: function () {},
        complete: function () {}
      })
    },
    loadCityByPosition (lon, lat) {
      getCityByPosition({lon: lon, lat: lat}).then(res => {
        var curCityName = res.data.ret
        store.commit('saveCurCityName', curCityName)
        store.commit('saveFromCity', curCityName)
      })
    }
  },

  created () {
    // let app = getApp()
  },

  mounted () {
    this.fromCity = store.state.fromCity
  },

  onLoad () {
    console.log('index.index onLoad')
    // get location
    this.loadPosition()
  }
}
</script>

<style scoped>
</style>
