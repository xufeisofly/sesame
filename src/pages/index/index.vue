<template>
  <div id="home">
    <van-cell-group>
      <van-field
        :value="fromCity"
        label="出发城市">
      </van-field>
    </van-cell-group>
    <a @click="goCities" class="fromStation">北京</a>
  </div>
</template>

<script>
import wx from '@/utils/wx'
import store from '@/pages/cities/store'

export default {
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
    }
  },

  created () {
    // let app = getApp()
  },

  mounted () {
    this.fromCity = store.state.fromCity
    console.log(store.state.fromCity, this.fromCity)
  }
}
</script>

<style scoped>
</style>
