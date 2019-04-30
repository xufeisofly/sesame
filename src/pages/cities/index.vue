<template>
  <div class="cities-wrap">
    <van-search
      :value="inputValue"
      placeholder="城市"
      show-action
    ></van-search>

    <div id="position" class="city-block">
      <p>定位/历史</p>
      <div class="city-list">
        <van-row>
          <van-col span="8" v-for="city in cities" :key="city.id">
            <div class="city-item">
              <van-button>{{ city.name }}</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: null,
      cities: [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' },
        { id: 3, name: '广州' }
      ]
    }
  },

  mounted () {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.options
    console.log(options)
  }
}
</script>

<style scoped>
.city-item {
  text-align: center;
}
</style>
