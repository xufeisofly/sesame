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
  </div>
</template>

<script>
import wx from '@/utils/wx'
import store from '@/pages/cities/store'
import mpvuePicker from 'mpvue-picker'

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
      ]
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
