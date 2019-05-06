<template>
  <div id="pois-list">
    <van-cell-group>
      <van-cell v-for="poi in pois"
                :key="poi.id"
                :title="poi.cn_name"
                size="large"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getPoisByCityName } from '@/utils/api'

export default {
  data () {
    return {
      cityName: null,
      pois: []
    }
  },
  onLoad (options) {
    this.cityName = options.city
    getPoisByCityName({ cityName: this.cityName }).then(res => {
      this.pois = res.data.pois
    })
  }
}
</script>

<style scoped>
</style>
