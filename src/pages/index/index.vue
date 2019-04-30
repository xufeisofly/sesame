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

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      fromCity: null
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
  }
}
</script>

<style scoped>
</style>
